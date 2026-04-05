import type { PostObjectPayload } from './types';

export class ObjectClient {
  private baseUrl = 'https://api.restful-api.dev/collections/products/objects';
  private key = '';

  async getObjects(ids?: string[]) {
    const options = {
      method: 'GET',
      headers: {
        'x-api-key': this.key
      }
    };

    if (ids && ids.length > 0) {
      const params = new URLSearchParams({ id: ids.join(',') });
      const response = await fetch(`${this.baseUrl}?${params}`, options);
      const body = await response.json();

      return {
        status: response.status,
        body
      };
    } else {
      const response = await fetch(this.baseUrl, options);
      const body = await response.json();

      return {
        status: response.status,
        body
      };
    }
  }

  async getObjectById(id: string) {
    const options = {
      method: 'GET',
      headers: {
        'x-api-key': this.key
      }
    };

    const response = await fetch(`${this.baseUrl}/${id}`, options);
    const body = await response.json();

    return {
      status: response.status,
      body
    };
  }

  async createObject(objectPayload: PostObjectPayload) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': this.key
      },
      body: JSON.stringify(objectPayload)
    };

    const response = await fetch(`${this.baseUrl}`, options);
    const body = await response.json();

    return {
      status: response.status,
      body
    };
  }

  async createInvalidObject(objectPayload: {}) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': this.key
      },
      body: JSON.stringify(objectPayload)
    };

    const response = await fetch(`${this.baseUrl}`, options);
    const body = await response.json();

    return {
      status: response.status,
      body
    };
  }

  async fullyUpdateObject(objectPayload: PostObjectPayload, id: string) {
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': this.key
      },
      body: JSON.stringify(objectPayload)
    };

    const response = await fetch(`${this.baseUrl}/${id}`, options);
    const body = await response.json();

    return {
      status: response.status,
      body
    };
  }

  async partialUpdateObject(objectPayload: {}, id: string) {
    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': this.key
      },
      body: JSON.stringify(objectPayload)
    };

    const response = await fetch(`${this.baseUrl}/${id}`, options);
    const body = await response.json();

    return {
      status: response.status,
      body
    };
  }

  async deleteObjectById(id: string) {
    const options = {
      method: 'DELETE',
      headers: {
        'x-api-key': this.key
      }
    };

    const response = await fetch(`${this.baseUrl}/${id}`, options);
    const body = await response.json();

    return {
      status: response.status,
      body
    };
  }
}
