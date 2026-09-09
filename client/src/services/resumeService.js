import api from './api';

export const resumeService = {
  async uploadResume(formData) {
    const response = await api.post('/resume/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  async analyzeText(resumeText) {
    const response = await api.post('/resume/analyze', { resumeText });
    return response.data;
  },

  async getLatestResume() {
    const response = await api.get('/resume/latest');
    return response.data;
  },

  async generateFromResume(config = {}) {
    const response = await api.post('/resume/generate-interview', config);
    return response.data;
  },
};
