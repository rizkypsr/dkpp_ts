<table border="1">
    <thead>
        <tr>
            <th></th>
        </tr>
        <tr>
            <th colspan="3" style="font-size: 14px; font-weight: bold;">
                PENGUKURAN KINERJA
            </th>
        </tr>
        <tr>
            <th colspan="3" style="font-size: 14px; font-weight: bold;">
                TRIBULAN 1 TAHUN 2024
            </th>
        </tr>
        <tr>
            <th></th>
        </tr>
        <tr>
            <th></th>
        </tr>
        <tr>
            <th>1</th>
            <th>Nama:</th>
            <th>NURKAMALIA,SKM,M.Si</th>
        </tr>
        <tr>
            <th>2</th>
            <th>NIP:</th>
            <th>'196501011986032036</th>
        </tr>
        <tr>
            <th>3</th>
            <th>PANGKAT/GOL. RUANG:</th>
            <th>Pembina Tk. I/IV-b</th>
        </tr>
        <tr>
            <th>4</th>
            <th>JABATAN:</th>
            <th>Kepala Dinas</th>
        </tr>
        <tr>
            <th>5</th>
            <th>UNIT KERJA:</th>
            <th>Dinas Ketahanan Pangan dan Perikanan</th>
        </tr>
        <tr>
            <th></th>
        </tr>
        <tr height="30">
            <th rowspan="2" style="font-weight: bold;" align="center" valign="center">No</th>
            <th rowspan="2" style="font-weight: bold;" align="center" valign="center">Kinerja</th>
            <th rowspan="2" style="font-weight: bold;" align="center" valign="center">Indikator Kinerja Individu</th>
            <th rowspan="2" style="font-weight: bold;" align="center" valign="center">Target</th>
            <th rowspan="2" style="font-weight: bold;" align="center" valign="center">REALISASI s.d TRIBULAN 1</th>
            <th rowspan="2" style="font-weight: bold;" align="center" valign="center">Capaian (%)</th>
            <th colspan="5" style="font-weight: bold;" align="center" valign="center">KETERKAITAN
                DENGAN KOMPONEN
                PERENCANAAN
            </th>
            <th rowspan="2" style="font-weight: bold;" align="center" valign="center">PENJELASAN</th>
            <th rowspan="2" style="font-weight: bold;" align="center" valign="center">ALTERNATIF/ UPAYA YANG TELAH
                DILAKUKAN</th>
        </tr>
        <tr>
            <th style="font-weight: bold;" align="center" valign="center">No</th>
            <th style="font-weight: bold;" align="center" valign="center">NAMA PROGRAM/ KEGIATAN / SUB KEGIATAN</th>
            <th style="font-weight: bold;" align="center" valign="center">ANGGARAN (Rp)</th>
            <th style="font-weight: bold;" align="center" valign="center">REALISASI (Rp)</th>
            <th style="font-weight: bold;" align="center" valign="center">% REALISASI</th>
        </tr>
    </thead>
    <tbody>
        @foreach ($kurja as $index => $data)
            @php
                $maxRows = $data->keterkaitanKurja->count();
            @endphp

            @if ($maxRows > 0)
                @for ($i = 0; $i < $maxRows; $i++)
                    <tr>
                        @if ($i == 0)
                            <td rowspan="{{ $maxRows }}" align="center" valign="top">{{ $index + 1 }}</td>
                            <td rowspan="{{ $maxRows }}" align="left" valign="top">{{ $data->kinerja }}</td>
                            <td rowspan="{{ $maxRows }}" align="left" valign="top">
                                {{ $data->indikator }}
                            </td>
                            <td rowspan="{{ $maxRows }}" align="left" valign="top">
                                {{ $data->target }}
                            </td>
                            <td rowspan="{{ $maxRows }}" align="left" valign="top">
                                {{ $data->realisasi }}
                            </td>
                            <td rowspan="{{ $maxRows }}" align="left" valign="top">
                                {{ $data->capaian / 100 }}
                            </td>
                        @endif

                        <td align="center" valign="top">{{ $i + 1 }}</td>
                        <td align="left" valign="top">
                            {{ $data->keterkaitanKurja->skip($i)->first()->program ?? '-' }}
                        </td>
                        <td align="left" valign="top">
                            {{ $data->keterkaitanKurja->skip($i)->first()->anggaran ?? '-' }}
                        </td>
                        <td align="left" valign="top">
                            {{ $data->keterkaitanKurja->skip($i)->first()->realisasi_rupiah ?? '-' }}
                        </td>
                        <td align="left" valign="top">
                            {{ $data->keterkaitanKurja->skip($i)->first()->realisasi_persentase / 100 }}
                        </td>

                        @if ($i == 0)
                            <td rowspan="{{ $maxRows }}" align="left" valign="top">
                                {{ $data->penjelasan }}
                            </td>
                            <td rowspan="{{ $maxRows }}" align="left" valign="top">
                                {{ $data->alternatif }}
                            </td>
                        @endif

                    </tr>
                @endfor
            @else
                <tr>
                    <td align="center" valign="top">{{ $index + 1 }}</td>
                    <td align="left" valign="top">{{ $data->kinerja }}</td>
                    <td align="left" valign="top">{{ $data->indikator }}</td>
                </tr>
            @endif
        @endforeach

        <tr>
            <td></td>
        </tr>
        <tr>
            <td></td>
        </tr>

        <tr>
            <td></td>
            <td align="center">Atasan Langsung</td>
            <td align="center">Atasan Langsung</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td align="center" colspan="2">Jombang, 28 Maret 2024</td>
        </tr>

        <tr>
            <td></td>
        </tr>
        <tr>
            <td></td>
        </tr>
        <tr>
            <td></td>
        </tr>
        <tr>
            <td></td>
        </tr>

        <tr>
            <td></td>
            <td align="center">{{ $name }}</td>
            <td align="center">{{ $name }}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td align="center" colspan="2">NURKAMALIA,SKM,M.Si</td>
        </tr>
        <tr>
            <td align="center"></td>
            <td align="center">NIP.{{ $nip }}</td>
            <td align="center">NIP.{{ $nip }}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td align="center" colspan="2">NIP.</td>
        </tr>
    </tbody>
</table>
