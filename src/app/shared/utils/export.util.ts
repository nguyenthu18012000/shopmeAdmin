export class ExportUtil {
  static exportExcel(fileData: any, fileName: string) {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(
      new Blob([fileData], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      })
    );
    a.download = fileName;
    a.click();
  }
}
