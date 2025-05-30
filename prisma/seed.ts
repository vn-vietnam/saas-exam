import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting to seed database...')

  // Clear existing data (optional - uncomment if needed)
  // await prisma.userAnswer.deleteMany()
  // await prisma.userExamAttempt.deleteMany()
  // await prisma.answer.deleteMany()
  // await prisma.question.deleteMany()
  // await prisma.exam.deleteMany()
  // await prisma.session.deleteMany()
  // await prisma.account.deleteMany()
  // await prisma.user.deleteMany()

  // 1. Create Users
  console.log('👥 Creating users...')
  const users = []
  
  // Create admin user
  const adminUser = await prisma.user.create({
    data: {
      name: 'Admin User',
      email: 'admin@example.com',
      hashedPassword: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password: "password"
      emailVerified: new Date(),
    }
  })
  users.push(adminUser)

  // Create regular users
  for (let i = 0; i < 20; i++) {
    const user = await prisma.user.create({
      data: {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        hashedPassword: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
        emailVerified: faker.datatype.boolean() ? faker.date.past() : null,
        image: faker.image.avatar(),
      }
    })
    users.push(user)
  }

  // 2. Create Exams
  console.log('📝 Creating exams...')
  const exams = []
  
  const examData = [
    {
      title: 'TOEIC Listening & Reading Test',
      description: 'Comprehensive TOEIC test covering listening and reading skills',
      timeLimit: 120,
      passingScore: 70
    },
    {
      title: 'Basic English Grammar Test',
      description: 'Test your fundamental English grammar knowledge',
      timeLimit: 45,
      passingScore: 60
    },
    {
      title: 'English Vocabulary Assessment',
      description: 'Evaluate your English vocabulary skills',
      timeLimit: 30,
      passingScore: 65
    },
    {
      title: 'IELTS Reading Practice Test',
      description: 'Practice test for IELTS reading section',
      timeLimit: 60,
      passingScore: 75
    },
    {
      title: 'Business English Test',
      description: 'Test your business English proficiency',
      timeLimit: 90,
      passingScore: 70
    }
  ]

  for (const examInfo of examData) {
    const exam = await prisma.exam.create({
      data: {
        title: examInfo.title,
        description: examInfo.description,
        timeLimit: examInfo.timeLimit,
        passingScore: examInfo.passingScore,
        isActive: faker.datatype.boolean(0.8), // 80% chance to be active
      }
    })
    exams.push(exam)
  }

  // 3. Create Questions and Answers
  console.log('❓ Creating questions and answers...')
  
  for (const exam of exams) {
    const numQuestions = faker.number.int({ min: 10, max: 25 })
    
    for (let i = 0; i < numQuestions; i++) {
      // Sample questions based on exam type
      let questionText = ''
      let answers = []
      
      if (exam.title.includes('Grammar')) {
        questionText = `Choose the correct form: "She _____ to the store yesterday."`
        answers = [
          { text: 'go', isCorrect: false },
          { text: 'goes', isCorrect: false },
          { text: 'went', isCorrect: true },
          { text: 'going', isCorrect: false }
        ]
      } else if (exam.title.includes('Vocabulary')) {
        questionText = `What does "ambitious" mean?`
        answers = [
          { text: 'Lazy and unmotivated', isCorrect: false },
          { text: 'Having strong desire for success', isCorrect: true },
          { text: 'Very tall', isCorrect: false },
          { text: 'Afraid of everything', isCorrect: false }
        ]
      } else if (exam.title.includes('TOEIC')) {
        questionText = `Listen to the conversation. What is the man\'s job?`
        answers = [
          { text: 'Teacher', isCorrect: false },
          { text: 'Doctor', isCorrect: true },
          { text: 'Engineer', isCorrect: false },
          { text: 'Lawyer', isCorrect: false }
        ]
      } else if (exam.title.includes('IELTS')) {
        questionText = `According to the passage, what is the main cause of climate change?`
        answers = [
          { text: 'Natural weather patterns', isCorrect: false },
          { text: 'Human activities', isCorrect: true },
          { text: 'Solar radiation changes', isCorrect: false },
          { text: 'Ocean currents', isCorrect: false }
        ]
      } else {
        questionText = faker.lorem.sentence() + '?'
        answers = [
          { text: faker.lorem.words(3), isCorrect: false },
          { text: faker.lorem.words(3), isCorrect: true },
          { text: faker.lorem.words(3), isCorrect: false },
          { text: faker.lorem.words(3), isCorrect: false }
        ]
      }

      const question = await prisma.question.create({
        data: {
          examId: exam.id,
          questionText,
          order: i + 1,
          points: faker.number.int({ min: 1, max: 5 }),
        }
      })

      // Create answers for this question
      for (let j = 0; j < answers.length; j++) {
        await prisma.answer.create({
          data: {
            questionId: question.id,
            answerText: answers[j].text,
            isCorrect: answers[j].isCorrect,
            order: j + 1,
          }
        })
      }
    }
  }

  // 4. Create Exam Attempts and User Answers
  console.log('🎯 Creating exam attempts and user answers...')
  
  const questions = await prisma.question.findMany({
    include: {
      answers: true
    }
  })

  // Create exam attempts for random users
  for (let i = 0; i < 50; i++) {
    const randomUser = faker.helpers.arrayElement(users)
    const randomExam = faker.helpers.arrayElement(exams)
    
    const examQuestions = questions.filter(q => q.examId === randomExam.id)
    
    const startTime = faker.date.past()
    const endTime = faker.date.between({ 
      from: startTime, 
      to: new Date(startTime.getTime() + randomExam.timeLimit * 60 * 1000) 
    })
    
    let correctAnswers = 0
    const totalQuestions = examQuestions.length
    
    const attempt = await prisma.userExamAttempt.create({
      data: {
        userId: randomUser.id,
        examId: randomExam.id,
        startTime,
        endTime,
        status: faker.helpers.arrayElement(['completed', 'in_progress', 'timeout']),
      }
    })

    // Create user answers for this attempt
    for (const question of examQuestions) {
      const shouldAnswer = faker.datatype.boolean(0.9) // 90% chance to answer
      
      if (shouldAnswer && question.answers.length > 0) {
        const selectedAnswer = faker.helpers.arrayElement(question.answers)
        const isCorrect = selectedAnswer.isCorrect
        
        if (isCorrect) correctAnswers++
        
        await prisma.userAnswer.create({
          data: {
            attemptId: attempt.id,
            questionId: question.id,
            answerId: selectedAnswer.id,
            isCorrect,
            answeredAt: faker.date.between({ from: startTime, to: endTime }),
          }
        })
      }
    }

    // Update attempt with final score
    const score = totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0
    const isPassed = score >= randomExam.passingScore
    
    await prisma.userExamAttempt.update({
      where: { id: attempt.id },
      data: {
        score,
        isPassed,
        status: 'completed',
      }
    })
  }

  // 5. Create some Sessions (for active users)
  console.log('🔐 Creating user sessions...')
  
  for (let i = 0; i < 10; i++) {
    const randomUser = faker.helpers.arrayElement(users)
    
    await prisma.session.create({
      data: {
        sessionToken: faker.string.uuid(),
        userId: randomUser.id,
        expires: faker.date.future(),
      }
    })
  }

  console.log('✅ Database seeding completed!')
  
  // Print summary
  const userCount = await prisma.user.count()
  const examCount = await prisma.exam.count()
  const questionCount = await prisma.question.count()
  const attemptCount = await prisma.userExamAttempt.count()
  
  console.log(`
📊 Seeding Summary:
👥 Users: ${userCount}
📝 Exams: ${examCount}
❓ Questions: ${questionCount}
🎯 Exam Attempts: ${attemptCount}
  `)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('❌ Error during seeding:', e)
    await prisma.$disconnect()
    process.exit(1)
  })