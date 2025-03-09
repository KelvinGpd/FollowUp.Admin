export const parseGeminiResponse = (response) => {
  const values = response.split(',');

  const parsedResponse = {
      patientName: values[0].trim(),
      medicationName: values[1].trim(),
      consumptionDetails: values[2].trim(),
      prescriptionDate: values[3].trim(),
      expDate: values[4].trim(),
      interval: values[5].trim(),
      amount: values[6].trim(),
      dosage: values[7].trim(),
  };

  return parsedResponse;
};

export default parseGeminiResponse;