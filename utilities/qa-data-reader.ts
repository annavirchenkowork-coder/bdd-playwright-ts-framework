import { readFileSync } from 'fs';
import path from 'path';
import { faker } from '@faker-js/faker';

/**
 * Represents a single price configuration for a product.
 */
export interface PriceData {
  active: boolean;
  baseAmount: number;
  type: string;
  upfrontDiscount?: boolean;
  upfrontDiscountAmount?: number;
  allowCoupons?: boolean;
  couponDiscount?: number;
  numberOfInstallments?: number | null;
}

/**
 * Strongly typed price model with normalized installments.
 */
export class Price {
  active: boolean;
  baseAmount: number;
  type: string;
  upfrontDiscount: boolean;
  upfrontDiscountAmount: number;
  allowCoupons: boolean;
  couponDiscount: number;
  numberOfInstallments: number | null;

  constructor(data: PriceData) {
    this.active = data.active;
    this.baseAmount = data.baseAmount;
    this.type = data.type;
    this.upfrontDiscount = data.upfrontDiscount ?? false;
    this.upfrontDiscountAmount = data.upfrontDiscountAmount ?? 0;
    this.allowCoupons = data.allowCoupons ?? false;
    this.couponDiscount = data.couponDiscount ?? 0;
    this.numberOfInstallments =
      data.numberOfInstallments !== undefined
        ? data.numberOfInstallments
        : null;
  }
}

/**
 * Raw product structure as defined in qa_data.json.
 */
export interface ProductData {
  available: boolean;
  productName: string;
  productId: string;
  teen: boolean;
  type: string;
  programId: string;
  programCode: string;
  programName: string;
  startDate: string;
  refundDate: string;
  externalUrl: string;
  terms: string;
  prices: PriceData[];
}

/**
 * Product model with embedded typed Price objects.
 */
export class Product {
  available: boolean;
  productName: string;
  productId: string;
  teen: boolean;
  type: string;
  programId: string;
  programCode: string;
  programName: string;
  startDate: string;
  refundDate: string;
  externalUrl: string;
  terms: string;
  prices: Price[];

  constructor(data: ProductData) {
    this.available = data.available;
    this.productName = data.productName;
    this.productId = data.productId;
    this.teen = data.teen;
    this.type = data.type;
    this.programId = data.programId;
    this.programCode = data.programCode;
    this.programName = data.programName;
    this.startDate = data.startDate;
    this.refundDate = data.refundDate;
    this.externalUrl = data.externalUrl;
    this.terms = data.terms;
    this.prices = data.prices.map((p) => new Price(p));
  }
}

/**
 * Shape of qa_data.json for convenient typing.
 * Extend this if your JSON grows.
 */
export interface QAData {
  available: string;        
  teen: string;             
  type: string;             
  productName: string;
  productId: string;
  programId: number;
  programCode: string;
  programName: string;
  startDate: string;
  refundDate: string;
  externalUrl: string;
  terms: string;
  prices: PriceData[];
}

// --- Load Program Data from JSON ---

const dataPath = path.resolve('data/qa_data.json');
const rawData = readFileSync(dataPath, 'utf-8');

// Cast to QAData for typed access (relies on qa_data.json being valid).
export const qaData = JSON.parse(rawData) as QAData;

// --- Test User Types & Helpers ---

/**
 * Represents generated test user data used in enrollment flows.
 */
export interface TestUser {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  howDidYouHear: string;
}

/**
 * Generates a random but valid test user for form filling.
 */
export function generateTestUser(): TestUser {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email({ provider: 'example.com' }),
    phone: faker.string.numeric(10),
    howDidYouHear: 'LinkedIn'
  };
}

/**
 * Static reference data for product/enrollment verification.
 */
export const productInfo: TestUser & {
  startDate: string;
  refundDate: string;
} = {
  firstName: 'Anna',
  lastName: 'Virchenko',
  email: 'anna.virchenko@example.com',
  phone: '5551234567',
  howDidYouHear: 'LinkedIn',
  startDate: qaData.startDate,
  refundDate: qaData.refundDate
};