import { APIRequestContext, expect, APIResponse } from '@playwright/test';

export class PetApiClient {
  constructor(private apiContext: APIRequestContext, private baseUrl: string) {}

  async getAvailablePets(): Promise<APIResponse> {
    return await this.apiContext.get(`${this.baseUrl}/pet/findByStatus?status=available`, {
      headers: { accept: 'application/json' },
    });
  }

  async updatePet(pet: { id: number; newName: string; status: string }): Promise<{response: APIResponse; requestPayload: any }> {
    const payload = {
    id: pet.id,
    name: pet.newName,
    status: pet.status,
    };
    const response = await this.apiContext.post(
      `${this.baseUrl}/pet/${pet.id}?name=${encodeURIComponent(pet.newName)}&status=${encodeURIComponent(pet.status)}`,
      {
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
        },
        data: payload,
      }
    );
    return { response, requestPayload: payload };
  }

  async deletePet(petId: number): Promise<APIResponse> {
    return await this.apiContext.delete(`${this.baseUrl}/pet/${petId}`);
  }
}
