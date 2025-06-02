import { Given, When, Then } from '@cucumber/cucumber';
import { expect, APIRequestContext, APIResponse, request } from '@playwright/test';
import { PetApiClient } from '../petApiClient';
import fs from 'fs';
import path, {join} from 'path';

const baseUrl = process.env.BASE_API_URL as string;

Given('the API client is initialized', async function () {
  this.apiContext = await request.newContext();
  this.petApiClient = new PetApiClient(this.apiContext, baseUrl);
});

When('I fetch pets', async function () {
  this.response = await this.petApiClient.getAvailablePets();
});

Then('the response status code should be {int}', async function (expectedStatus: number) {
  expect(this.response.status()).toBe(expectedStatus);
});

Then('the response should contain atleast one pet', async function () {
  const body = await this.response.json();
  expect(Array.isArray(body)).toBe(true);
  expect(body.length).toBeGreaterThan(0);
});


//Update pets using JSON test data
Given('I load pet test data from {string}', async function (filePath: string) {
  const fullPath = path.resolve(__dirname, '..', 'test-data', 'pets.json');
  const jsonData = fs.readFileSync(fullPath, 'utf-8');
  this.petTestData = JSON.parse(jsonData);
  expect(this.petTestData.length).toBeGreaterThan(0);
});

When('I update each pet with its new name', async function () {
  for (const pet of this.petTestData) {
    this.response = await this.petApiClient.updatePet(pet);
    
  }
});

Then('each pet update response status should be {int}', async function (expectedStatus: number) {
  expect(this.response.status()).toBe(200);
});

Given('a pet with ID {int}', function (petId: number) {
  this.petIdToDelete = petId;
});

When('I send a DELETE request', async function () {
  this.response = await this.petApiClient.deletePet(this.petIdToDelete);
});
