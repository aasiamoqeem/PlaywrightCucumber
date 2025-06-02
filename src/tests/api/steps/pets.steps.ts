import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import * as fs from 'fs';
import path from 'path';
import { PetApiClient } from '../petApiClient'
import '../../../config/env';

const baseUrl = process.env.BASE_API_URL as string;

Given('the API client is initialized', async function () {
  this.apiClient = new PetApiClient(this.apiContext, baseUrl);
});

When('I fetch pets', async function () {
  this.response = await this.apiClient.getAvailablePets();
  this.responseBody = await this.response.json();
});

When('I update each pet with its new name', async function () {
  this.updateResponses = [];
  for (const pet of this.testData) {
    const res = await this.apiClient.updatePet(pet);
    this.updateResponses.push(res);
  }
});

When('I send a DELETE request', async function () {
  this.response = await this.apiClient.deletePet(this.petIdToDelete);
});
