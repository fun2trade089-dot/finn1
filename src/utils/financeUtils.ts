/**
 * Formats a number into Indian Rupee (₹) format with Lakh/Crore notation.
 * e.g., 100000 -> ₹1,00,000
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

/**
 * SIP Calculation Formula:
 * M = P × ({[1 + i]^n – 1} / i) × (1 + i)
 * Monthly Return (i) = (1 + Annual Return)^(1/12) - 1
 */
export const calculateSIP = (
  monthlyInvestment: number,
  annualReturnRate: number,
  durationYears: number
) => {
  const annualReturnDecimal = annualReturnRate / 100;
  const monthlyReturnRate = Math.pow(1 + annualReturnDecimal, 1 / 12) - 1;
  const numberOfMonths = durationYears * 12;

  const totalInvested = monthlyInvestment * numberOfMonths;
  
  // SIP formula: M = P × ({[1 + i]^n – 1} / i) × (1 + i)
  const maturityAmount = 
    monthlyInvestment * 
    ((Math.pow(1 + monthlyReturnRate, numberOfMonths) - 1) / monthlyReturnRate) * 
    (1 + monthlyReturnRate);

  const estimatedReturns = maturityAmount - totalInvested;

  // Generate growth data for chart
  const growthData = [];
  for (let year = 1; year <= durationYears; year++) {
    const months = year * 12;
    const yearInvested = monthlyInvestment * months;
    const yearMaturity = 
      monthlyInvestment * 
      ((Math.pow(1 + monthlyReturnRate, months) - 1) / monthlyReturnRate) * 
      (1 + monthlyReturnRate);
    
    growthData.push({
      year: `Year ${year}`,
      invested: Math.round(yearInvested),
      returns: Math.round(yearMaturity - yearInvested),
      total: Math.round(yearMaturity),
    });
  }

  return {
    totalInvested: Math.round(totalInvested),
    estimatedReturns: Math.round(estimatedReturns),
    totalCorpus: Math.round(maturityAmount),
    growthData,
  };
};

/**
 * SWP Calculation logic:
 * Total return = Amount at start + interest - withdrawal
 * Iterate monthly for the duration.
 */
export const calculateSWP = (
  totalInvestment: number,
  monthlyWithdrawal: number,
  annualReturnRate: number,
  durationYears: number
) => {
  const annualReturnDecimal = annualReturnRate / 100;
  const monthlyReturnRate = Math.pow(1 + annualReturnDecimal, 1 / 12) - 1;
  const numberOfMonths = durationYears * 12;

  let currentBalance = totalInvestment;
  const withdrawalData = [];
  let totalWithdrawn = 0;

  for (let month = 1; month <= numberOfMonths; month++) {
    const interestEarned = currentBalance * monthlyReturnRate;
    currentBalance = currentBalance + interestEarned - monthlyWithdrawal;
    totalWithdrawn += monthlyWithdrawal;

    if (month % 12 === 0 || month === numberOfMonths) {
      withdrawalData.push({
        year: `Year ${Math.ceil(month / 12)}`,
        balance: Math.max(0, Math.round(currentBalance)),
        withdrawn: Math.round(totalWithdrawn),
      });
    }

    if (currentBalance <= 0) {
      currentBalance = 0;
      // If balance hits zero early, we stop adding months or cap it
    }
  }

  return {
    totalWithdrawn: Math.round(totalWithdrawn),
    remainingCorpus: Math.round(currentBalance),
    withdrawalData,
  };
};
