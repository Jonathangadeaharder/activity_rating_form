/**
 * Google Apps Script for Activity Rating Form
 * 
 * SETUP INSTRUCTIONS:
 * 1. Go to https://script.google.com
 * 2. Click "New Project"
 * 3. Paste this entire code
 * 4. Click "Deploy" → "New deployment"
 * 5. Type: Web app
 * 6. Execute as: Me
 * 7. Who has access: Anyone
 * 8. Click "Deploy"
 * 9. Copy the Web App URL
 * 10. Paste it in script_with_sheets.js (GOOGLE_SCRIPT_URL variable)
 */

// This function handles POST requests (form submissions)
function doPost(e) {
  try {
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Get or create the spreadsheet
    const sheet = getOrCreateSheet();
    
    // Create header row if this is the first entry
    if (sheet.getLastRow() === 0) {
      createHeaders(sheet, data);
    }
    
    // Add the response data
    addResponse(sheet, data);
    
    // Return success
    return ContentService
      .createTextOutput(JSON.stringify({ success: true, message: 'Response saved!' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return error
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: false, 
        error: error.toString() 
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// This function handles GET requests (for testing)
function doGet() {
  return ContentService.createTextOutput(
    'Activity Rating Form - Google Sheets Integration is working! ✅\n\n' +
    'This endpoint accepts POST requests with form data.'
  );
}

// Get or create the spreadsheet
function getOrCreateSheet() {
  // Try to get existing spreadsheet
  let spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  
  // If no spreadsheet exists, create one
  if (!spreadsheet) {
    spreadsheet = SpreadsheetApp.create('Activity Rating Responses');
  }
  
  // Get or create the sheet
  let sheet = spreadsheet.getSheetByName('Responses');
  if (!sheet) {
    sheet = spreadsheet.insertSheet('Responses');
  }
  
  return sheet;
}

// Create header row
function createHeaders(sheet, data) {
  const headers = ['Timestamp', 'Name'];
  
  // Add all activity names as columns
  for (const activity in data.ratings) {
    headers.push(activity);
  }
  
  // Set headers
  sheet.appendRow(headers);
  
  // Format header row
  const headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setFontWeight('bold');
  headerRange.setBackground('#667eea');
  headerRange.setFontColor('#ffffff');
  
  // Freeze header row
  sheet.setFrozenRows(1);
}

// Add a response to the sheet
function addResponse(sheet, data) {
  const row = [
    new Date(data.timestamp),
    data.name
  ];
  
  // Get headers to ensure correct column order
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  
  // Add ratings in the same order as headers
  for (let i = 2; i < headers.length; i++) {
    const activity = headers[i];
    row.push(data.ratings[activity] !== null ? data.ratings[activity] : '');
  }
  
  // Append the row
  sheet.appendRow(row);
  
  // Format the timestamp column
  const lastRow = sheet.getLastRow();
  sheet.getRange(lastRow, 1).setNumberFormat('yyyy-mm-dd hh:mm:ss');
  
  // Add conditional formatting for ratings (optional)
  formatRatings(sheet, lastRow, headers.length);
}

// Add color coding to ratings
function formatRatings(sheet, row, numColumns) {
  // Color code ratings: 1=red, 2=orange, 3=yellow, 4=light green, 5=green
  for (let col = 3; col <= numColumns; col++) {
    const cell = sheet.getRange(row, col);
    const value = cell.getValue();
    
    if (value === 1) {
      cell.setBackground('#ffebee'); // Light red
    } else if (value === 2) {
      cell.setBackground('#fff3e0'); // Light orange
    } else if (value === 3) {
      cell.setBackground('#fffde7'); // Light yellow
    } else if (value === 4) {
      cell.setBackground('#e8f5e9'); // Light green
    } else if (value === 5) {
      cell.setBackground('#c8e6c9'); // Green
    }
  }
}

// Optional: Function to get statistics
function getStatistics() {
  const sheet = getOrCreateSheet();
  const data = sheet.getDataRange().getValues();
  
  if (data.length <= 1) {
    return { message: 'No responses yet' };
  }
  
  const stats = {
    totalResponses: data.length - 1,
    latestResponse: data[data.length - 1][0],
    averageRatings: {}
  };
  
  // Calculate average for each activity
  const headers = data[0];
  for (let col = 2; col < headers.length; col++) {
    const activity = headers[col];
    let sum = 0;
    let count = 0;
    
    for (let row = 1; row < data.length; row++) {
      const value = data[row][col];
      if (value !== '' && !isNaN(value)) {
        sum += Number(value);
        count++;
      }
    }
    
    stats.averageRatings[activity] = count > 0 ? (sum / count).toFixed(2) : 'N/A';
  }
  
  return stats;
}

// Optional: Function to export as CSV
function exportAsCSV() {
  const sheet = getOrCreateSheet();
  const data = sheet.getDataRange().getValues();
  
  let csv = '';
  data.forEach(row => {
    csv += row.map(cell => `"${cell}"`).join(',') + '\n';
  });
  
  return csv;
}
