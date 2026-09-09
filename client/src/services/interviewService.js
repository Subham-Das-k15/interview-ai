import api from './api';

export const interviewService = {
  async generateInterview(config) {
    const response = await api.post('/interviews/generate', config);
    return response.data;
  },

  async evaluateInterview(payload) {
    const response = await api.post('/interviews/evaluate', payload);
    return response.data;
  },

  async getHistory(params = {}) {
    const response = await api.get('/interviews/history', { params });
    return response.data;
  },

  async getInterviewById(id) {
    const response = await api.get(`/interviews/${id}`);
    return response.data;
  },

  async toggleFavorite(id) {
    const response = await api.patch(`/interviews/${id}/favorite`);
    return response.data;
  },

  async deleteInterview(id) {
    const response = await api.delete(`/interviews/${id}`);
    return response.data;
  },

  async getAnalytics() {
    const response = await api.get('/interviews/analytics');
    return response.data;
  },
};
