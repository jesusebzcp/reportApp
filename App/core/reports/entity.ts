export interface Report {
  title: string;
  description: string;
  id?: string | number[];
  createAt: Date;
  imageUrl: string | null;
}

export interface ReportContext {
  loading: boolean;
  reports: Report[] | [];
  reportForm: Report;
}
