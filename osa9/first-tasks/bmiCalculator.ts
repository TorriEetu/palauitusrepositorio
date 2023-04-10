/*
interface BmiArgs {
    height: number
    weight: number
}
*/
function categorize(bmi: number) {
    if (bmi < 16) 
        return 'Underweight (Severe thinness)'
    if (bmi < 17) 
        return 'Underweight (Moderate thinness)'
    if (bmi < 18.5) 
        return 'Underweight (Mild thinness)'
    if (bmi < 25) 
        return 'Normal (Healthy weight)'
    if (bmi < 30) 
        return 'Overweight (Pre-obese)'
    if (bmi < 35) 
        return 'Obese (Class I)'
    if (bmi < 40) 
        return 'Obese (Class II)'
    return 'Obese (Class III) '
}
    
export function calculateBmi (height:number , weight:number) {
    console.log(height)
    height = (height / 100.0)
    return categorize(weight / (height ** 2))
}

/*
function parseArgsBmi(args: Array<string>): BmiArgs {
    if (args.length < 2)
        throw(new Error('not enough arguments'))
    if (args.length > 2)
        throw(new Error('too many arguments'))

  
    const height = Number(args[0])
    const weight = Number(args[1])
    if (isNaN(height) || isNaN(weight)) {
        throw(new Error('provided values were not numbers'))
    }
  
    return {
      height,
      weight,
    }
  }

const bmiArgs = parseArgsBmi(process.argv.splice(2))
console.log(calculateBmi(bmiArgs.height, bmiArgs.weight))
*/