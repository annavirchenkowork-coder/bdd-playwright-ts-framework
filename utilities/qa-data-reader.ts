import { readFileSync } from "fs";

/**
 * Interface defining the structure of price data
 */
interface PriceData {
  active: boolean;
  baseAmount: number;
  type: string;
  upfrontDiscount: boolean;
  upfrontDiscountAmount: number;
  allowCoupons: boolean;
  couponDiscount: number;
  numberOfInstallments?: number;
}

/**
 * Class representing a price option for a product
 */
class Price {
  active: boolean;
  baseAmount: number;
  type: string;
  upfrontDiscount: boolean;
  upfrontDiscountAmount: number;
  allowCoupons: boolean;
  couponDiscount: number;
  numberOfInstallments: number | null;

  /**
   * Constructs a Price instance
   * @param priceData - Object containing price information
   */
  constructor({
    active,
    baseAmount,
    type,
    upfrontDiscount,
    upfrontDiscountAmount,
    allowCoupons,
    couponDiscount,
    numberOfInstallments,
  }: PriceData) {
    this.active = active;
    this.baseAmount = baseAmount;
    this.type = type;
    this.upfrontDiscount = upfrontDiscount;
    this.upfrontDiscountAmount = upfrontDiscountAmount;
    this.allowCoupons = allowCoupons;
    this.couponDiscount = couponDiscount;
    this.numberOfInstallments = numberOfInstallments || null;
  }
}

/**
 * Interface defining the structure of product data
 */
interface ProductData {
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
 * Class representing a product
 */
class Product {
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

  /**
   * Constructs a Product instance
   * @param productData - Object containing product information
   */
  constructor({
    available,
    productName,
    productId,
    teen,
    type,
    programId,
    programCode,
    programName,
    startDate,
    refundDate,
    externalUrl,
    terms,
    prices,
  }: ProductData) {
    this.available = available;
    this.productName = productName;
    this.productId = productId;
    this.teen = teen;
    this.type = type;
    this.programId = programId;
    this.programCode = programCode;
    this.programName = programName;
    this.startDate = startDate;
    this.refundDate = refundDate;
    this.externalUrl = externalUrl;
    this.terms = terms;
    this.prices = prices.map((price) => new Price(price));
  }
}

/**
 * Exports a Product instance created from JSON data in a file
 */
export const productInfo = new Product(
  JSON.parse(readFileSync("./data/qa_data.json", "utf8"))
)