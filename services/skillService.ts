import axios, { AxiosRequestConfig } from 'axios';

const API_URL = '/api/skills';

interface SkillData {
  // Define your actual skill fields here; this is a placeholder.
  [key: string]: any;
}

type Token = string;

// Create new skill
const createSkill = async (skillData: SkillData, token: Token) => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  };

  const response = await axios.post(API_URL, skillData, config);
  return response.data;
};

// Get all skills
const getSkills = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Get user skills
const getMySkills = async (token: Token) => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_URL}/me`, config);
  return response.data;
};

// Get single skill
const getSkill = async (skillId: string) => {
  const response = await axios.get(`${API_URL}/${skillId}`);
  return response.data;
};

// Update skill
const updateSkill = async (skillId: string, skillData: SkillData, token: Token) => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  };

  const response = await axios.put(`${API_URL}/${skillId}`, skillData, config);
  return response.data;
};

// Delete skill
const deleteSkill = async (skillId: string, token: Token) => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(`${API_URL}/${skillId}`, config);
  return response.data;
};

const skillService = {
  createSkill,
  getSkills,
  getMySkills,
  getSkill,
  updateSkill,
  deleteSkill,
};

export default skillService;
