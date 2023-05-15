// import { stringify } from 'csv-stringify/sync';
import { saveAs } from 'file-saver';
import data from './data';
import { TableData } from './CompanySettingsProps';

export const handleDownload = () => {
    // Convert the JSON data to CSV format
    const headers = Object.keys(data[0]);
    const csvData = [headers.join(',')];
    for (const row of data) {
      const values = headers.map((header) => row[header as keyof TableData]);
      csvData.push(values.join(','));
    }

    // Create a Blob object for the CSV data
    const blob = new Blob([csvData.join('\n')], { type: 'text/csv' });

    // Download the file using the saveAs method from the FileSaver library
    saveAs(blob, 'tableData.csv');
  };

  export const randomizer = (min: number, max: number) => {
    return Math.random() % (max - min) + min;
  }