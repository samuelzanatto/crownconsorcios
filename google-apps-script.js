// =====================================================
// Google Apps Script - Receber dados do formulário Crown
// =====================================================
//
// COMO CONFIGURAR:
//
// 1. Crie uma planilha no Google Sheets
// 2. Na primeira linha, adicione os cabeçalhos:
//    | data_envio | localizacao | consorcio | entrada | valor | nome | email | telefone | mensagem |
//
// 3. Vá em Extensões > Apps Script
// 4. Cole TODO este código no editor
// 5. Clique em "Implantar" > "Nova implantação"
// 6. Tipo: "App da Web"
// 7. Executar como: "Eu"
// 8. Quem tem acesso: "Qualquer pessoa"
// 9. Clique em "Implantar" e copie a URL gerada
// 10. Cole a URL no arquivo Dialog.astro na variável GOOGLE_SCRIPT_URL
//
// =====================================================

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);

    // Append row with the form data
    sheet.appendRow([
      data.data_envio || new Date().toLocaleString('pt-BR'),
      data.localizacao || '',
      data.consorcio || '',
      data.entrada || '',
      data.valor || '',
      data.nome || '',
      data.email || '',
      data.telefone || '',
      data.mensagem || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Test function (optional)
function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok', message: 'Crown Consórcios API is running' }))
    .setMimeType(ContentService.MimeType.JSON);
}
