const OPERATOR_VALUES = {
  'anytime': '',
  'yesterday': '-111',
  'today': '-112',
  'last week': '-113',
  'this week': '-114',
  'last month': '-115',
  'this month': '-116',
  'last 24 hours': '-101',
  'last 7 days': '-102',
  'last 30 days': '-103'
};

const OPERANDS = {
  'greater than': '14',
  'less than': '15',
  'equal to': '1',
  'contains': '17',
  'is after': '7'
}

const FIELDS = {
  'lead_name': 'display_name',
  'lead_company_name': 'lead_company.name',
  'lead_country': 'country',
  'lead_deal_expected_close_date': 'lead_deal.expected_close',
  'lead_lead_score': 'lead_score',
  'lead_created_at': 'created_at',
  'lead_updated_at': 'updated_at',
  'lead_deal_value': 'lead_deal.amount',
  'lead_last_contacted': 'last_contacted',
  'contact_name': 'display_name',
  'contact_country': 'country',
  'contact_expected_close_date': 'deal.expected_close',
  'contact_lead_score': 'lead_score',
  'contact_deal_value': 'open_deals_amount',
  'contact_probability': 'deal.probability',
  'contact_created_at': 'created_at',
  'contact_updated_at': 'updated_at',
  'contact_last_contacted': 'last_contacted',
  'account_name': 'name',
  'account_country': 'country',
  'account_expected_close_date': 'deal.expected_close',
  'account_deal_value': 'open_deals_amount',
  'account_probability': 'probability',
  'account_created_at': 'created_at',
  'account_updated_at': 'updated_at',
  'account_last_contacted': 'last_contacted',
  'deal_name': 'name',
  'deal_expected_close_date': 'expected_close',
  'deal_account_name': 'sales_account.name',
  'deal_created_at': 'created_at',
  'deal_updated_at': 'updated_at',
  'deal_deal_value': 'amount',
  'deal_deal_age': 'age',
};

const ARRAY_OPERANDS = ['contains']

function transformer({
  entity,
  operand: field,
  value: operatorValue,
  operator: operandValue
}) {
  let value = OPERATOR_VALUES[operatorValue] || operatorValue;
  let operator = OPERANDS[operandValue] || operandValue;

  return {
    name: FIELDS[`${entity}_${underscorize(field)}`],
    value: ARRAY_OPERANDS.includes(operandValue) ? [value] : value,
    operator
  };
}

function underscorize(key) {
  return key.replace(' ', '_');
}

export default transformer;
