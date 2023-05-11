export interface FormData {
    step1: {
      name: string;
      client: string;
      client_number: string;
      client_email: string;
    };
    step2: {
      start_date: string;
      end_date: string;
      collaborator: string;
      departement: string;
    };
  }