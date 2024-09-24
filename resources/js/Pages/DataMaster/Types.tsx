export type JabatanOption = {
    value: number;
    label: string;
};

export type Jabatan = {
    id: number;
    nama: string;
    created_at: string;
    updated_at: string;
};

// Type for the PenilaianJabatan object
export type PenilaianJabatan = {
    id: number;
    penilaian_ke_jabatan: number;
    data_master_id: number;
    created_at: string;
    updated_at: string;
    jabatan: Jabatan;
};

// Type for the User object
export type User = {
    id: number;
    nip: string;
    name: string;
    username: string;
    jabatan_id: number | null;
    created_at: string;
    updated_at: string;
    jabatan: Jabatan | null;
};

// Type for the DataMaster object
export type DataMaster = {
    id: number;
    feedback: number;
    users_id: number;
    feedback_by: number | null;
    created_at: string;
    updated_at: string;
    users: User;
    penilaian_jabatan: PenilaianJabatan[];
};

// Pagination link object
export type PaginationLink = {
    url: string | null;
    label: string;
    active: boolean;
};

// Type for the paginated response
export type PaginatedResponse = {
    current_page: number;
    data: DataMaster[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: PaginationLink[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
};
