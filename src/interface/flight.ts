interface IOfferResponse {
  id: string;
  slices: string[];
  updated_at: string;
  total_emissions_kg: string;
  total_currency: string;
  total_amount: string;
  tax_currency: string;
  tax_amount: string;
  private_fares: string[];
  payment_requirements: string[];
  passengers: string[];
  passenger_identity_documents_required: boolean;
  partial: boolean;
  owner: string[];
  live_mode: boolean;
  expires_at: string;
  created_at: string;
  conditions: string[];
  base_currency: string;
  base_amount: string;
  available_payment_types: string;
  allowed_passenger_identity_document_types: string[];
}


export default IOfferResponse;