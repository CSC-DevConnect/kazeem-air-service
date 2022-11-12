import Axios from 'axios';

class HttpRequest {
  async postRequest(url: string, data: Record<string, any>, token: string) {
    try {
      const response = await Axios({
        method: 'POST',
        url,
        data: { ...data },
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept-Encoding': 'gzip',
          'Duffel-Version': 'beta',
        },
      });
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  getRequest = async (url: string, token?: string) => {
    try {
      const response = await Axios({
        method: 'GET',
        url,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Duffel-Version': 'beta',
        },
      });
      return response.data;
    } catch (error) {
      console.log({ error });
      throw error;
    }
  };
}

export default HttpRequest;
