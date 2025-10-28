// Mock data storage for questionnaire responses

let mockResponses = [];

export const saveMockResponse = (response) => {
  const responseWithTimestamp = {
    ...response,
    timestamp: new Date().toISOString(),
    id: Date.now().toString()
  };
  mockResponses.push(responseWithTimestamp);
  console.log('Mock response saved:', responseWithTimestamp);
  return responseWithTimestamp;
};

export const getMockResponses = () => {
  return mockResponses;
};

export const clearMockResponses = () => {
  mockResponses = [];
};