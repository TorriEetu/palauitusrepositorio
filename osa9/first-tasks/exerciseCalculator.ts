
interface Args {
    hours: Array<number>
    target: number
}

interface Result {
    periodLength: number
    trainingDays: number
    success: boolean
    rating: number
    ratingDescription: string
    target: number
    average: number
}


function getRating(average: number, target: number): number  {
    if (average < target * 0.5) 
        return 1;
    if (average < target) 
        return 2;
    return 3;
};

function ratingToDescription(rating: number): string {
    if (rating === 1)
        return ''
    if (rating === 2)
        return 'not too bad but could be better'
    if (rating === 3)
        return ''
    return ''
}

function calculateExercises(hours: Array<number>, dailyTargetHours: number): Result {
    const periodLength = hours.length;
    const trainingDays = hours.filter((h) => h > 0).length
    const target = dailyTargetHours
    const average = periodLength === 0 ? 0 : hours.reduce((prev, curr) => prev + curr, 0) / hours.length
    const success = average >= dailyTargetHours
    const rating = getRating(average, target);  
    const ratingDescription = ratingToDescription(rating)
    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average,
    }
}

function parseArgs(args: Array<string>): Args {
    if (args.length < 1) {
        throw(new Error('not enough arguments'))
    }
  
    const target = Number(args[0])
    const hours: Array<number> = args.splice(1).map(x => Number(x))
  
    if (isNaN(target) || hours.some(x => isNaN(x))) {
      throw(new Error('provided values were not numbers'))
    }
  
    return {
      hours,
      target
    }
  }
  
  const args = parseArgs(process.argv.splice(2))
  console.log(calculateExercises(args.hours, args.target))