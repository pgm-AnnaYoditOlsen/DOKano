<?php

namespace App\Exporters;

use Statamic\Forms\Exporters\Exporter;
use Statamic\Contracts\Forms\Form;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use Illuminate\Support\Facades\Log;

class ExcelExporter extends Exporter
{
    public static string $title = 'Excel';

    public function __construct(Form $form)
    {
        $this->form = $form;
    }

    public function export(): string
    {
        $spreadsheet = new Spreadsheet();
        $sheet = $spreadsheet->getActiveSheet();

        $row = 1;
        foreach ($this->form->submissions() as $submission) {
            $data = $submission->data();
            $sheet->fromArray($data->toArray(), null, 'A' . $row);
            $row++;
        }

        $writer = new Xlsx($spreadsheet);
        $tempFile = tempnam(sys_get_temp_dir(), 'excel');
        $writer->save($tempFile);
        
        $excelData = file_get_contents($tempFile);
        unlink($tempFile);

        return $excelData;
    }

    public function extension(): string
    {
        return 'xlsx';
    }
}