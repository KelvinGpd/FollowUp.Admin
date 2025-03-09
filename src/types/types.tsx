export interface User {
    uuid: string;
    name: string;
    branchName: string;
    branchAddress: string;
    ailments: string;
    phoneNumber: string;
}

export interface Medication {
    uuid: string;
    patientName: string;
    medicationName: string;
    consumptionDetails: string;
    prescriptionDate: string;
    expDate: string;
    interval: string;
    amount: string;
    dosage: string;
    hasTaken: boolean;
}
