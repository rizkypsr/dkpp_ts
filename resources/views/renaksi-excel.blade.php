<table border="1">
    <thead>
        <tr>
            <th></th>
        </tr>
        <tr>
            <th colspan="3" style="font-size: 14px; font-weight: bold;">
                MONITORING DAN EVALUASI RENCANA AKSI PENCAPAIAN KINERJA
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
            <th>{{ $nama_kepala_dinas }}</th>
        </tr>
        <tr>
            <th>2</th>
            <th>NIP:</th>
            <th>'{{ $nip_kepala_dinas }}</th>
        </tr>
        <tr>
            <th>3</th>
            <th>PANGKAT/GOL. RUANG:</th>
            <th>{{ $pangkat_kepala_dinas }}</th>
        </tr>
        <tr>
            <th>4</th>
            <th>JABATAN:</th>
            <th>{{ $jabatan_kepala_dinas }}</th>
        </tr>
        <tr>
            <th>5</th>
            <th>UNIT KERJA:</th>
            <th>{{ $unit_kerja_kepala_dinas }}</th>
        </tr>
        <tr>
            <th></th>
        </tr>
        <tr height="30">
            <th style="font-weight: bold;" align="center" valign="center">No</th>
            <th style="font-weight: bold;" align="center" valign="center">Kinerja</th>
            <th style="font-weight: bold;" align="center" valign="center">Indikator Kinerja Individu</th>
            <th style="font-weight: bold;" colspan="2" align="center" valign="center">Rencana Aksi</th>
            <th style="font-weight: bold;" align="center" valign="center">Target</th>
            <th style="font-weight: bold;" align="center" valign="center">Realisasi</th>
            <th style="font-weight: bold;" align="center" valign="center">Capaian (%)</th>
            <th style="font-weight: bold;" align="center" valign="center">Catatan Monev</th>
            <th style="font-weight: bold;" align="center" valign="center">Tindak Lanjut</th>
            <th style="font-weight: bold;" align="center" valign="center">Bukti Pendukung</th>
        </tr>
    </thead>
    <tbody>
        @foreach ($monevRenaksi as $index => $data)
            @php
                $maxRows = $data->rencanaAksi->count();
            @endphp

            @if ($maxRows > 0)
                @for ($i = 0; $i < $maxRows; $i++)
                    <tr>
                        @if ($i == 0)
                            <!-- Show Kinerja and Indikator in the first row -->
                            <td rowspan="{{ $maxRows }}" align="center" valign="top">{{ $index + 1 }}</td>
                            <td rowspan="{{ $maxRows }}" align="left" valign="top">{{ $data->kinerja }}</td>
                            <td rowspan="{{ $maxRows }}" align="left" valign="top">
                                {{ $data->indikator }}
                            </td>
                        @endif

                        <td align="center" valign="top">{{ $i + 1 }}</td>
                        <td align="left" valign="top">
                            {{ $data->rencanaAksi->skip($i)->first()->rencana_aksi ?? '-' }}</td>
                        <td align="left" valign="top">{{ $data->rencanaAksi->skip($i)->first()->target ?? '-' }}
                        </td>
                        <td align="left" valign="top">{{ $data->rencanaAksi->skip($i)->first()->realisasi ?? '-' }}
                        </td>
                        <td align="left" valign="top">{{ $data->rencanaAksi->skip($i)->first()->capaian ?? '-' }}
                        </td>
                        <td align="left" valign="top">{{ $data->rencanaAksi->skip($i)->first()->catatan ?? '-' }}
                        </td>
                        <td align="left" valign="top">
                            {{ $data->rencanaAksi->skip($i)->first()->tindak_lanjut ?? '-' }}
                        </td>
                        <td align="left" valign="top">
                            {{ $data->rencanaAksi->skip($i)->first()->bukti_pendukung ? baseName($data->rencanaAksi->skip($i)->first()->bukti_pendukung) : '-' }}
                        </td>
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
            <td align="center" colspan="2">Jombang,
                {{ \Carbon\Carbon::parse($updated_at)->translatedFormat('d F Y') }}
            </td>
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
            <td align="center" colspan="2">{{ $nama_kepala_dinas }}</td>
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
            <td align="center" colspan="2">NIP.{{ $nip_kepala_dinas }}</td>
        </tr>
    </tbody>
</table>
