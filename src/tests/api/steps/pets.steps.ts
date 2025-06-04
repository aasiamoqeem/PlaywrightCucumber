import { Given, When, Then } from '@cucumber/cucumber';
import { expect, APIRequestContext, APIResponse, request } from '@playwright/test';
import { PetApiClient } from '../petApiClient';
import fs from 'fs';
import path, {join} from 'path';

const baseUrl = process.env.BASE_API_URL as string;

Given('the API client is initialized', async function () {
  this.apiContext = await request.newContext();
  this.petApiClient = new PetApiClient(this.apiContext, baseUrl);
  this.attach("API client is initialized successfully");
});

When('I fetch pets', async function () {
  this.response = await this.petApiClient.getAvailablePets();
  const payload = await this.response.json();
  this.attach("GET response payload:\n" + JSON.stringify(payload, null, 2));
});

Then('the response status code should be {int}', async function (expectedStatus: number) {
  this.attach(`Status received - ${this.response.status()}`);
  expect(this.response.status()).toBe(expectedStatus);
});

Then('the response should contain atleast one pet', async function () {
  const body = await this.response.json();
  expect(Array.isArray(body)).toBe(true);
  expect(body.length).toBeGreaterThan(0);
  this.attach('Response has atleast 1 pet');
});


//Update pets using JSON test data
Given('I load pet test data from {string}', async function (filePath: string) {
  const fullPath = path.resolve(__dirname, '..', 'test-data', 'pets.json');
  const jsonData = fs.readFileSync(fullPath, 'utf-8');
  this.petTestData = JSON.parse(jsonData);
  expect(this.petTestData.length).toBeGreaterThan(0);
  this.attach('Loaded Test Data from Json file successfully')
});

When('I update each pet with its new name', async function () {
  for (const pet of this.petTestData) {
    const {response, requestPayload }  = await this.petApiClient.updatePet(pet);
    this.attach(`Request Payload:\n${JSON.stringify(requestPayload, null, 2)}`, 'application/json');
    this.response = response;
    this.attach(`Updated Pet Response:\n${pet.id}\n${JSON.stringify(pet, null, 2)}`, 'application/json');

  }
});

Then('each pet update response status should be {int}', async function (expectedStatus: number) {
  this.attach(`Status received - ${this.response.status()}`);
  expect(this.response.status()).toBe(200);
});

Given('a pet with ID {int}', function (petId: number) {
  this.petIdToDelete = petId;
  this.attach(`${petId} is to be deleted`);
});

When('I send a DELETE request', async function () {
  this.response = await this.petApiClient.deletePet(this.petIdToDelete);
  const payload = await this.response.text();
  this.attach("DELETE response:\n" + payload);
});
