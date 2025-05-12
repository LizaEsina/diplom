import axios from 'axios';

const apiUrl = 'http://localhost:9000/api/test';

export const getTestQuestions = async (lessonId) => {
  try {
    const response = await axios.get(`${apiUrl}/index.php`);
    return response.data.questions;
  } catch (error) {
    console.error('Error fetching questions:', error);
    return [];
  }
};


export async function submitTestAnswers(answers) {
    const response = await axios.post('/api/test/submit_test.php', 
      { answers }, // <-- это правильный JSON-объект
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data;
  }
