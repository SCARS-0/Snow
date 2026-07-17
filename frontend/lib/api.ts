import { config } from "@/lib/config";

export class ApiClient {
  private readonly baseUrl: string;

  constructor(baseUrl: string = config.apiUrl) {
    this.baseUrl = baseUrl;
  }

  async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        `GET ${endpoint} failed with status ${response.status}`
      );
    }

    return (await response.json()) as T;
  }

  async post<TRequest, TResponse>(
    endpoint: string,
    body: TRequest
  ): Promise<TResponse> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(
        `POST ${endpoint} failed with status ${response.status}`
      );
    }

    return (await response.json()) as TResponse;
  }

  async put<TRequest, TResponse>(
    endpoint: string,
    body: TRequest
  ): Promise<TResponse> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(
        `PUT ${endpoint} failed with status ${response.status}`
      );
    }

    return (await response.json()) as TResponse;
  }

  async delete(endpoint: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(
        `DELETE ${endpoint} failed with status ${response.status}`
      );
    }
  }
}

export const apiClient = new ApiClient();