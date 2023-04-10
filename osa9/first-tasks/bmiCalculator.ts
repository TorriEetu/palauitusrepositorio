function categorize(bmi: number) {
    if (bmi < 16) 
        return 'Underweight (Severe thinness)';
    if (bmi < 17) 
        return 'Underweight (Moderate thinness)';
    if (bmi < 18.5) 
        return 'Underweight (Mild thinness)';
    if (bmi < 25) 
        return 'Normal (Healthy weight)';
    if (bmi < 30) 
        return 'Overweight (Pre-obese)';
    if (bmi < 35) 
        return 'Obese (Class I)';
    if (bmi < 40)
        return 'Obese (Class II)';
    return 'Obese (Class III) ';
}
    
export function calculateBmi (height:number , weight:number) {
    console.log(height);
    height = (height / 100.0);
    return categorize(weight / (height ** 2));
}