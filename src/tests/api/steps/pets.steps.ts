import {  Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { expect } from '@playwright/test';;
import * as fs from 'fs';
import path, {join} from 'path';
import '../../../config/env';

const baseUrl = process.env.BASE_API_URL as string;

//Get a list of available pets
Given('the API endpoint is entered', async function () {
  this.endpoint = `${baseUrl}"/pet/findByStatus?status=available"`;
});

When('I fetch pets', async function () {
  this.response = await this.apiContext.get(this.endpoint, {
    headers: {
      'accept': 'application/json'
    }
  });
  this.responseBody = await this.response.json();
});

Then('the response status code should be {int}', function (statusCode: number) {
  expect(this.response.status()).toBe(statusCode);
});

Then('the response should contain atleast one pet', function () {
  expect(Array.isArray(this.responseBody)).toBe(true);
  expect(this.responseBody.length).toBeGreaterThan(0);
});

//Update pets using JSON test data
Given('I load pet test data from {string}', async function (filePath: string) {
  const fullPath = path.resolve(__dirname, '..', 'test-data', 'pets.json');
  const jsonContent = fs.readFileSync(fullPath, 'utf-8');
  this.testData = JSON.parse(jsonContent);
});

When('I update each pet with its new name', async function () {
  this.updateResponses = [];
  for (const pet of this.testData) {
    const res = await this.apiContext.post(`${baseUrl}/pet/${pet.id}?name=${encodeURIComponent(pet.newName)}&status=${encodeURIComponent(pet.status)}`, {
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
      },
      data: {
        id: pet.id,
        name: pet.newName,
        status: pet.status,
      },
    });
    this.updateResponses.push(res);
  }
});

Then('each pet update response status should be {int}', async function (statusCode: number) {
  const failedUpdates: string[] = [];
  for (let i = 0; i < this.updateResponses.length; i++) {
    const res = this.updateResponses[i];
    const pet = this.testData[i]; // Match response with input pet
    const actualStatus = res.status();

    if (actualStatus !== statusCode) {
      failedUpdates.push(
        `Pet update failed for ID ${pet.id} - Expected: ${statusCode}, Received: ${actualStatus}`
      );
    } else {
      console.log(`Pet updated successfully for ID ${pet.id}`);
    }
  }

    if (failedUpdates.length > 0) {
    const errorMessage = `\nPet update failures:\n${failedUpdates.join('\n')}`;
    throw new Error(errorMessage);
  
  }  
});

//Delete a pet by ID
Given('a pet with ID {int}', async function (petId: number) {
  this.petIdToDelete = petId;
});

When('I send a DELETE request', async function () {
  this.response = await this.apiContext.delete(`${baseUrl}/pet/${this.petIdToDelete}`);
});



