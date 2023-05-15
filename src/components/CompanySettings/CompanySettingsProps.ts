export interface TogglerProps {
    activeToggle: number,
    setActiveToggle: React.Dispatch<React.SetStateAction<number>>
}

export interface TableData {
    name: string;
    status: string;
    role: string;
    lastLogin: string;
}

export interface TableProps {
    data: TableData[]
}