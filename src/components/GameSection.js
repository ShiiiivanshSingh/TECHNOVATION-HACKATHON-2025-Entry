import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaTrophy, FaStar, FaMedal, FaChartLine, FaUndo } from 'react-icons/fa';
import confetti from 'canvas-confetti';
import CourtroomSimulator from './CourtroomSimulator';
import RightsMatchingGame from './MatchTheRights'; // Import the RightsMatchingGame component

const QUESTIONS_PER_TURN = 5;

const QUESTIONS = {
  basic: [
    {
      question: "What is the legal age for voting in India?",
      options: ["16 years", "18 years", "21 years", "25 years"],
      correct: 1,
      explanation: "In India, citizens can vote when they turn 18 years old.",
      reference: {
        text: "Election Commission of India - Voter Eligibility",
        url: "https://eci.gov.in/voter/voter-eligibility/",
        authority: "Verified by Election Commission of India (ECI)"
      }
    },
    {
      question: "Every child has the right to...",
      options: ["Free education until age 14", "Work in factories", "Skip school", "Pay for primary education"],
      correct: 0,
      explanation: "Under RTE Act, every child has the right to free education until age 14."
    },
    {
      question: "What should you do if you witness bullying?",
      options: ["Join in", "Ignore it", "Tell a teacher or trusted adult", "Film it for social media"],
      correct: 2,
      explanation: "Always report bullying to a trusted adult who can help stop it."
    },
    {
      question: "Which number should you call for child emergency services?",
      options: ["911", "100", "1098", "112"],
      correct: 2,
      explanation: "1098 is CHILDLINE, India's 24/7 emergency helpline for children."
    },
    {
      question: "What is the minimum age for creating a social media account?",
      options: ["10 years", "13 years", "16 years", "18 years"],
      correct: 1,
      explanation: "Most social media platforms require users to be at least 13 years old."
    },
    {
      question: "Which of these is a child's right?",
      options: ["Work in factories", "Safe environment to grow", "Skip school", "Stay up late"],
      correct: 1,
      explanation: "Every child has the right to grow up in a safe environment."
    },
    {
      question: "What should you do if a stranger online asks for personal information?",
      options: ["Share it", "Tell parents/guardian", "Keep it secret", "Make up fake info"],
      correct: 1,
      explanation: "Always tell a trusted adult if someone online asks for personal information."
    }
  ],
  intermediate: [
    {
      question: "What is the Right to Education Act?",
      options: [
        "Law making education free and compulsory for ages 6-14",
        "Law about college education",
        "Rules for private schools only",
        "Guidelines for teachers"
      ],
      correct: 0,
      explanation: "RTE Act makes education a fundamental right for children aged 6-14 years."
    },
    {
      question: "What is POCSO Act?",
      options: [
        "Protection of Children from Social Media",
        "Protection of Children from School Offences",
        "Protection of Children from Sexual Offences",
        "Protection of Children from Society"
      ],
      correct: 2,
      explanation: "POCSO Act protects children from sexual abuse and exploitation."
    },
    {
      question: "Which right allows you to express your views freely?",
      options: ["Right to Property", "Right to Freedom of Expression", "Right to Vote", "Right to Travel"],
      correct: 1,
      explanation: "Freedom of Expression is a fundamental right in India."
    },
    {
      question: "What is the legal working age in India?",
      options: ["12 years", "14 years", "16 years", "18 years"],
      correct: 1,
      explanation: "Children below 14 years cannot work in most occupations in India."
    },
    {
      question: "What should you do if you face cyberbullying?",
      options: [
        "Delete your account",
        "Bully them back",
        "Keep it to yourself",
        "Tell parents/teachers and save evidence"
      ],
      correct: 3,
      explanation: "Always report cyberbullying and save evidence like screenshots."
    },
    {
      question: "Which organization protects child rights in India?",
      options: ["NCPCR", "UNESCO", "WHO", "UNICEF"],
      correct: 0,
      explanation: "National Commission for Protection of Child Rights (NCPCR) protects children's rights in India."
    },
    {
      question: "What is the Juvenile Justice Act about?",
      options: [
        "School rules",
        "Care and protection of children",
        "Children's games",
        "Child education"
      ],
      correct: 1,
      explanation: "The JJ Act provides for proper care, protection, and treatment of children."
    }
  ],
  advanced: [
    {
      question: "What is the punishment for child labor under Indian law?",
      options: [
        "No punishment",
        "Fine only",
        "Imprisonment up to 1 year and/or fine",
        "Warning only"
      ],
      correct: 2,
      explanation: "Employment of children below 14 years can result in imprisonment and fine."
    },
    {
      question: "Which article of Indian Constitution guarantees free education?",
      options: ["Article 21", "Article 21A", "Article 22", "Article 23"],
      correct: 1,
      explanation: "Article 21A makes free education a fundamental right."
    },
    {
      question: "What is 'Gillick Competence'?",
      options: [
        "Sports rule",
        "Child's capacity to make decisions",
        "School grade",
        "Medical term"
      ],
      correct: 1,
      explanation: "Gillick Competence refers to a child's capacity to make their own decisions."
    },
    {
      question: "Which UN convention protects child rights globally?",
      options: [
        "UNCRC",
        "UNHRC",
        "UNICEF",
        "UNESCO"
      ],
      correct: 0,
      explanation: "The UN Convention on the Rights of the Child (UNCRC) protects children's rights globally."
    },
    {
      question: "What is the role of Child Welfare Committee (CWC)?",
      options: [
        "Organize sports",
        "Manage schools",
        "Protect child rights and rehabilitation",
        "Provide meals"
      ],
      correct: 2,
      explanation: "CWC is responsible for protecting child rights and rehabilitation of children in need."
    },
    {
      question: "What is the maximum punishment under POCSO Act?",
      options: [
        "1 year",
        "5 years",
        "10 years",
        "Life imprisonment"
      ],
      correct: 3,
      explanation: "POCSO Act provides for life imprisonment for serious offenses against children."
    },
    {
      question: "Which body monitors RTE implementation?",
      options: [
        "Supreme Court",
        "State Commission",
        "NCPCR",
        "Local Police"
      ],
      correct: 2,
      explanation: "NCPCR monitors the implementation of Right to Education Act."
    }
  ]
};

const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const GameSection = ({ darkMode, onClose }) => {
  const [selectedGame, setSelectedGame] = useState(null);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [points, setPoints] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [reward, setReward] = useState('');
  const [candies, setCandies] = useState(() => {
    const saved = localStorage.getItem('candies');
    return saved ? parseInt(saved, 10) : 0;
  });
  const [totalScore, setTotalScore] = useState(() => {
    const saved = localStorage.getItem('totalScore');
    return saved ? parseInt(saved, 10) : 0;
  });
  const [achievements, setAchievements] = useState([]);
  const [streak, setStreak] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameStats, setGameStats] = useState({
    gamesPlayed: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);
  const [currentMode, setCurrentMode] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [currentRound, setCurrentRound] = useState(0);
  const [selectedChit, setSelectedChit] = useState(null);
  const [isExplanationVisible, setIsExplanationVisible] = useState(false);
  const [matchedRights, setMatchedRights] = useState([]);
  const [shuffledOptions, setShuffledOptions] = useState([]);

  const games = [
    {
      id: 1,
      title: "Know Your Rights Quiz",
      description: "Test your knowledge about children's rights in India through this interactive quiz.",
      type: "quiz",
      image: "https://images.unsplash.com/photo-1581726707445-75cbe4efc586?q=80&w=1776&auto=format&fit=crop",
      questions: [
        {
          question: "What is the legal age for voting in India?",
          options: ["16 years", "18 years", "21 years", "25 years"],
          correct: 1,
          explanation: "In India, citizens who are 18 years or older have the right to vote. This was established by the 61st Amendment of the Constitution in 1988.",
          reference: {
            text: "Election Commission of India - Voter Eligibility",
            url: "https://eci.gov.in/voter/voter-eligibility/",
            authority: "Verified by Election Commission of India (ECI)"
          }
        },
        {
          question: "Under which article of the Indian Constitution is free education guaranteed?",
          options: ["Article 21", "Article 21A", "Article 22", "Article 23"],
          correct: 1,
          explanation: "Article 21A makes free education a fundamental right for children between 6-14 years of age.",
          reference: {
            text: "Ministry of Education - RTE Act",
            url: "https://mhrd.gov.in/rte",
            authority: "Verified by Ministry of Education, Government of India"
          }
        },
        {
          question: "What is POCSO Act primarily concerned with?",
          options: ["Child Education", "Child Labor", "Child Protection from Sexual Offenses", "Child Nutrition"],
          correct: 2,
          explanation: "The Protection of Children from Sexual Offences (POCSO) Act protects children from sexual assault, harassment, and pornography.",
          reference: {
            text: "Ministry of Women and Child Development - POCSO Act",
            url: "https://wcd.nic.in/act/protection-children-sexual-offences-pocso-act-2012",
            authority: "Verified by Ministry of Women and Child Development"
          }
        },
        {
          question: "Which helpline number is dedicated to children in distress?",
          options: ["100", "101", "1098", "112"],
          correct: 2,
          explanation: "1098 is CHILDLINE, India's 24/7 emergency helpline for children in need of care and protection.",
          reference: {
            text: "CHILDLINE India Foundation - About 1098",
            url: "https://www.childlineindia.org/a/about/1098",
            authority: "Verified by CHILDLINE India Foundation"
          }
        },
        {
          question: "What is the minimum age for creating a social media account?",
          options: ["10 years", "13 years", "16 years", "18 years"],
          correct: 1,
          explanation: "Most social media platforms require users to be at least 13 years old to create an account.",
          reference: {
            text: "UNICEF - Guidelines for Social Media Use",
            url: "https://www.unicef.org/online-safety",
            authority: "Verified by UNICEF"
          }
        },
        {
          question: "Which organization is responsible for protecting child rights in India?",
          options: ["NCPCR", "UNESCO", "WHO", "UNICEF"],
          correct: 0,
          explanation: "The National Commission for Protection of Child Rights (NCPCR) is the primary body for protecting child rights in India.",
          reference: {
            text: "NCPCR - About Us",
            url: "https://ncpcr.gov.in/index1.php?lang=1&level=0&linkid=1&lid=1",
            authority: "Verified by National Commission for Protection of Child Rights"
          }
        },
        {
          question: "What is the legal age of marriage for girls in India?",
          options: ["16 years", "18 years", "21 years", "No minimum age"],
          correct: 1,
          explanation: "The legal age of marriage for girls in India is 18 years under the Prohibition of Child Marriage Act.",
          reference: {
            text: "Ministry of Law and Justice - Prohibition of Child Marriage Act",
            url: "https://legislative.gov.in/sites/default/files/A2007-06.pdf",
            authority: "Verified by Ministry of Law and Justice, Government of India"
          }
        },
        {
          question: "Which UN convention protects children's rights globally?",
          options: ["UNCRC", "UNHRC", "UNICEF", "UNESCO"],
          correct: 0,
          explanation: "The UN Convention on the Rights of the Child (UNCRC) is the international treaty protecting children's rights.",
          reference: {
            text: "United Nations - Convention on the Rights of the Child",
            url: "https://www.ohchr.org/en/instruments-mechanisms/instruments/convention-rights-child",
            authority: "Verified by United Nations Human Rights Office"
          }
        },
        {
          question: "What percentage of seats are reserved for disadvantaged groups in private schools under RTE?",
          options: ["15%", "20%", "25%", "30%"],
          correct: 2,
          explanation: "25% of seats must be reserved for economically disadvantaged students under the Right to Education Act.",
          reference: {
            text: "RTE Act Section 12(1)(c)",
            url: "https://mhrd.gov.in/rte_rules",
            authority: "Verified by Ministry of Education, Government of India"
          }
        },
        {
          question: "What is the minimum age for employment in hazardous occupations?",
          options: ["14 years", "16 years", "18 years", "21 years"],
          correct: 2,
          explanation: "Employment of children below 18 years in hazardous occupations is prohibited under Indian law.",
          reference: {
            text: "Child Labour (Prohibition and Regulation) Amendment Act, 2016",
            url: "https://labour.gov.in/childlabour/child-labour-acts-and-rules",
            authority: "Verified by Ministry of Labour and Employment"
          }
        },
        {
          question: "Which right allows children to express their views freely?",
          options: ["Right to Property", "Right to Freedom of Expression", "Right to Vote", "Right to Travel"],
          correct: 1,
          explanation: "Freedom of Expression is a fundamental right that allows children to express their views on matters affecting them.",
          reference: {
            text: "UNCRC Article 13 - Freedom of Expression",
            url: "https://www.unicef.org/child-rights-convention/convention-text",
            authority: "Verified by United Nations Convention on the Rights of the Child"
          }
        },
        {
          question: "What is 'Gillick Competence'?",
          options: ["Sports rule", "Child's capacity to make decisions", "School grade", "Medical term"],
          correct: 1,
          explanation: "Gillick Competence refers to a child's capacity to make their own decisions about their care and treatment.",
          reference: {
            text: "Medical Council of India - Guidelines on Consent",
            url: "https://www.nmc.org.in/rules-regulations/guidelines",
            authority: "Verified by National Medical Commission"
          }
        },
        {
          question: "What is the role of Child Welfare Committee (CWC)?",
          options: ["Organize sports", "Manage schools", "Protect child rights and rehabilitation", "Provide meals"],
          correct: 2,
          explanation: "CWC is responsible for protecting child rights and ensuring rehabilitation of children in need of care and protection.",
          reference: {
            text: "Juvenile Justice (Care and Protection of Children) Act, 2015",
            url: "https://wcd.nic.in/acts/juvenile-justice-care-and-protection-children-act-2015",
            authority: "Verified by Ministry of Women and Child Development"
          }
        },
        {
          question: "Under which act is corporal punishment in schools prohibited?",
          options: ["RTE Act", "IPC", "Juvenile Justice Act", "POCSO Act"],
          correct: 0,
          explanation: "The Right to Education (RTE) Act prohibits physical punishment and mental harassment in schools.",
          reference: {
            text: "RTE Act Section 17 - Prohibition of Physical Punishment",
            url: "https://mhrd.gov.in/rte_rules",
            authority: "Verified by Ministry of Education, Government of India"
          }
        },
        {
          question: "What is the maximum punishment under POCSO Act?",
          options: ["5 years", "10 years", "20 years", "Life imprisonment"],
          correct: 3,
          explanation: "The POCSO Act provides for life imprisonment for aggravated penetrative sexual assault on children.",
          reference: {
            text: "POCSO Act Section 6 - Punishment for Aggravated Penetrative Sexual Assault",
            url: "https://wcd.nic.in/act/protection-children-sexual-offences-pocso-act-2012",
            authority: "Verified by Ministry of Women and Child Development"
          }
        },
        {
          question: "Which body monitors RTE implementation?",
          options: ["Supreme Court", "State Commission", "NCPCR", "Local Police"],
          correct: 2,
          explanation: "The National Commission for Protection of Child Rights (NCPCR) monitors RTE implementation.",
          reference: {
            text: "NCPCR - RTE Monitoring",
            url: "https://ncpcr.gov.in/index1.php?lang=1&level=0&linkid=3&lid=122",
            authority: "Verified by National Commission for Protection of Child Rights"
          }
        }
      ]
    },
    {
      id: 2,
      title: "Safety Scenarios",
      description: "Learn how to handle real-life situations through interactive scenarios.",
      type: "interactive",
      image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      scenarios: [
        {
          situation: "If a stranger offers you candy and asks you to go with them, what should you do?",
          options: [
            "Accept the candy and go with them",
            "Say no firmly and tell a trusted adult immediately",
            "Take the candy but don't go with them",
            "Talk to them to be polite"
          ],
          correct: 1,
          explanation: "Never accept anything from strangers or go anywhere with them. Always say 'NO' firmly and immediately tell a trusted adult.",
          reference: {
            text: "National Crime Prevention Council - Child Safety Guidelines",
            url: "https://www.ncpc.org/resources/child-safety/",
            authority: "Verified by National Crime Prevention Council"
          }
        },
        {
          situation: "If someone touches you inappropriately, what should you do?",
          options: [
            "Keep it a secret",
            "Feel ashamed",
            "Tell a trusted adult immediately",
            "Ignore it"
          ],
          correct: 2,
          explanation: "If anyone touches you inappropriately, it's NOT your fault. Tell a trusted adult immediately. Remember the 'Safe Touch, Unsafe Touch' rule. You have the right to say NO to any touch that makes you uncomfortable.",
          reference: {
            text: "POCSO Act Guidelines - Child Safety",
            url: "https://wcd.nic.in/acts/protection-children-sexual-offences-pocso-act-2012",
            authority: "Verified by Ministry of Women and Child Development"
          }
        },
        {
          situation: "If you see your friend being bullied at school, what should you do?",
          options: [
            "Join the bullies to avoid being bullied",
            "Ignore it as it's not your problem",
            "Film it on your phone",
            "Report it to a teacher or school authority"
          ],
          correct: 3,
          explanation: "Bullying is wrong and should never be ignored. Report it to teachers or school authorities immediately.",
          reference: {
            text: "Anti-Bullying Guidelines for Schools",
            url: "https://www.cbse.gov.in/anti-bullying-guidelines",
            authority: "Verified by Central Board of Secondary Education"
          }
        },
        {
          situation: "If a stranger online asks for your personal information or photos, what should you do?",
          options: [
            "Share the information to be polite",
            "Tell a parent or trusted adult immediately",
            "Share fake information instead",
            "Keep chatting with them"
          ],
          correct: 1,
          explanation: "Never share personal information or photos with strangers online.",
          reference: {
            text: "Cyber Safety Guidelines for Children",
            url: "https://cybercrime.gov.in/children-safety",
            authority: "Verified by Ministry of Home Affairs, Cyber Safety Division"
          }
        },
        {
          situation: "If you feel unsafe while walking home from school, what should you do?",
          options: [
            "Run as fast as you can",
            "Hide somewhere",
            "Go to the nearest safe zone (school, police station, trusted neighbor)",
            "Call a stranger for help"
          ],
          correct: 2,
          explanation: "If you feel unsafe, go to the nearest safe zone like a school, police station, or a trusted neighbor's house.",
          reference: {
            text: "Child Safety Guidelines - Safe Routes to School",
            url: "https://morth.nic.in/safe-route-to-school",
            authority: "Verified by Ministry of Road Transport and Highways"
          }
        },
        {
          situation: "If someone you met online wants to meet you in person, what should you do?",
          options: [
            "Meet them in a public place",
            "Tell your parents and never meet them",
            "Go with a friend to meet them",
            "Keep it a secret and meet them alone"
          ],
          correct: 1,
          explanation: "Never meet someone you met online in person. Online friends may not be who they claim to be.",
          reference: {
            text: "Online Safety Guidelines - Cyber Peace Foundation",
            url: "https://www.cyberpeace.org/online-safety",
            authority: "Verified by Cyber Peace Foundation"
          }
        },
        {
          situation: "If you find a suspicious package or object at school, what should you do?",
          options: [
            "Open it to see what's inside",
            "Take it to lost and found",
            "Don't touch it and tell a teacher immediately",
            "Show it to your friends"
          ],
          correct: 2,
          explanation: "Never touch or handle suspicious objects. Report them to teachers or authorities immediately.",
          reference: {
            text: "School Safety Guidelines - NDMA",
            url: "https://ndma.gov.in/Resources/school-safety-guidelines",
            authority: "Verified by National Disaster Management Authority"
          }
        },
        {
          situation: "If there's a fire alarm at school, what should you do?",
          options: [
            "Gather your belongings first",
            "Follow evacuation procedures calmly",
            "Hide in the bathroom",
            "Run as fast as you can"
          ],
          correct: 1,
          explanation: "Always follow evacuation procedures calmly. Leave your belongings behind and follow your teacher's instructions.",
          reference: {
            text: "School Safety Manual - Fire Safety",
            url: "https://cbse.gov.in/safety-guidelines/fire-safety",
            authority: "Verified by Central Board of Secondary Education"
          }
        },
        {
          situation: "If someone shares inappropriate content in a group chat, what should you do?",
          options: [
            "Share it with other friends",
            "Delete it and ignore",
            "Report it to an adult and block the sender",
            "Like or react to it"
          ],
          correct: 2,
          explanation: "Never share inappropriate content. Report it to a trusted adult and block the sender.",
          reference: {
            text: "Cyber Safety for Children - Online Content",
            url: "https://www.cybercrime.gov.in/children-safety/inappropriate-content",
            authority: "Verified by Ministry of Home Affairs, Cyber Crime Division"
          }
        },
        {
          situation: "If you witness someone being discriminated against, what should you do?",
          options: [
            "Join in to fit in",
            "Ignore it to avoid trouble",
            "Stand up for them and report the incident",
            "Film it for social media"
          ],
          correct: 2,
          explanation: "Always stand up against discrimination. Report incidents to teachers or authorities.",
          reference: {
            text: "Anti-Discrimination Guidelines - NCPCR",
            url: "https://ncpcr.gov.in/anti-discrimination-guidelines",
            authority: "Verified by National Commission for Protection of Child Rights"
          }
        },
        {
          situation: "If someone pressures you to try drugs or alcohol, what should you do?",
          options: [
            "Try it just once",
            "Say no firmly and tell a trusted adult",
            "Keep it a secret",
            "Go along to be cool"
          ],
          correct: 1,
          explanation: "Always say NO to drugs and alcohol. Don't give in to peer pressure.",
          reference: {
            text: "Drug Abuse Prevention Guidelines - NCERT",
            url: "https://ncert.nic.in/drug-abuse-prevention",
            authority: "Verified by National Council of Educational Research and Training"
          }
        },
        {
          situation: "If you see someone posting suicidal thoughts online, what should you do?",
          options: [
            "Ignore it as attention-seeking",
            "Tell them to cheer up",
            "Report it to platform and tell a trusted adult",
            "Share it with friends"
          ],
          correct: 2,
          explanation: "Take all mentions of suicide seriously. Report the post and tell a trusted adult immediately.",
          reference: {
            text: "Mental Health Guidelines - NIMHANS",
            url: "https://nimhans.ac.in/suicide-prevention-guidelines",
            authority: "Verified by National Institute of Mental Health and Neurosciences"
          }
        },
        {
          situation: "If you find yourself lost in a public place, what should you do?",
          options: [
            "Ask any stranger for help",
            "Keep walking to find your way",
            "Stay where you are and seek help from security/staff",
            "Try to find your way alone"
          ],
          correct: 2,
          explanation: "If lost, stay where you are. Look for security personnel, store staff, or a help desk.",
          reference: {
            text: "Child Safety in Public Places - BPR&D",
            url: "https://bprd.nic.in/child-safety-guidelines",
            authority: "Verified by Bureau of Police Research & Development"
          }
        },
        {
          situation: "If someone tries to force you into a vehicle, what should you do?",
          options: [
            "Go quietly to avoid attention",
            "Scream 'HELP', run, and make noise",
            "Get in and try to escape later",
            "Talk to them calmly"
          ],
          correct: 1,
          explanation: "Make as much noise as possible. Yell 'HELP' or 'This is not my parent!' Run towards crowded areas.",
          reference: {
            text: "Child Abduction Prevention Guidelines - NCPCR",
            url: "https://ncpcr.gov.in/child-safety/abduction-prevention",
            authority: "Verified by National Commission for Protection of Child Rights"
          }
        },
        {
          situation: "If you find inappropriate content while browsing online, what should you do?",
          options: [
            "Keep browsing out of curiosity",
            "Share it with friends",
            "Close it immediately and tell an adult",
            "Save it for later"
          ],
          correct: 2,
          explanation: "Close inappropriate content immediately. Tell a trusted adult who can help report it.",
          reference: {
            text: "Safe Browsing Guidelines - CERT-In",
            url: "https://cert-in.org.in/safe-browsing",
            authority: "Verified by Indian Computer Emergency Response Team"
          }
        }
      ]
    },
    {
      id: 3,
      title: "Quiz Challenges",
      description: "Learn how to handle real-life situations through interactive scenarios.",
      type: "quiz",
      questions: [
        {
          question: "What is the minimum age for working in India?",
          options: ["14 years", "16 years", "18 years", "12 years"],
          correct: 0,
          explanation: "The minimum age for working in India is 14 years.",
          reference: {
            text: "Ministry of Labour and Employment - Child Labour Prohibition Act",
            url: "https://labour.gov.in/childlabour/child-labour-acts-and-rules",
            authority: "Verified by Ministry of Labour and Employment"
          }
        },
        {
          question: "What should you do if you see a child working in a factory?",
          options: [
            "Report to ChildLine (1098)",
            "Ignore it",
            "Take photos",
            "Talk to the child"
          ],
          correct: 0,
          explanation: "If you see a child working in a factory, report it to ChildLine (1098) immediately.",
          reference: {
            text: "National Child Helpline - Report Child Labour",
            url: "https://childlineindia.org.in/report-child-labour/",
            authority: "Verified by National Child Helpline"
          }
        },
        {
          question: "Under which article of the Indian Constitution is free education guaranteed?",
          options: ["Article 21", "Article 21A", "Article 22", "Article 23"],
          correct: 1,
          explanation: "Article 21A makes free education a fundamental right for children between 6-14 years of age.",
          reference: {
            text: "Ministry of Education - RTE Act",
            url: "https://mhrd.gov.in/rte",
            authority: "Verified by Ministry of Education, Government of India"
          }
        },
        {
          question: "What is POCSO Act primarily concerned with?",
          options: ["Child Education", "Child Labor", "Child Protection from Sexual Offenses", "Child Nutrition"],
          correct: 2,
          explanation: "The Protection of Children from Sexual Offences (POCSO) Act protects children from sexual assault, harassment, and pornography.",
          reference: {
            text: "Women and Child Development Ministry - POCSO Act",
            url: "https://wcd.nic.in/act/protection-children-sexual-offences-pocso-act-2012",
            authority: "Verified by Ministry of Women and Child Development"
          }
        },
        {
          question: "Which helpline number is dedicated to children in distress?",
          options: ["100", "101", "1098", "112"],
          correct: 2,
          explanation: "1098 is CHILDLINE, India's 24/7 emergency helpline for children in need of care and protection.",
          reference: {
            text: "National Child Helpline - Contact Us",
            url: "https://childlineindia.org.in/contact-us/",
            authority: "Verified by National Child Helpline"
          }
        },
        {
          question: "What is the minimum age for creating a social media account?",
          options: ["10 years", "13 years", "16 years", "18 years"],
          correct: 1,
          explanation: "Most social media platforms require users to be at least 13 years old to create an account.",
          reference: {
            text: "Children's Online Privacy Protection Act (COPPA)",
            url: "https://www.ftc.gov/en/business-guidance/resources/childrens-online-privacy-protection-act-coppa",
            authority: "Verified by Federal Trade Commission (FTC)"
          }
        },
        {
          question: "Which organization is responsible for protecting child rights in India?",
          options: ["NCPCR", "UNESCO", "WHO", "UNICEF"],
          correct: 0,
          explanation: "The National Commission for Protection of Child Rights (NCPCR) is the primary body for protecting child rights in India.",
          reference: {
            text: "NCPCR - About Us",
            url: "https://ncpcr.gov.in/index.php?lang=1",
            authority: "Verified by National Commission for Protection of Child Rights"
          }
        },
        {
          question: "What is the legal age of marriage for girls in India?",
          options: ["16 years", "18 years", "21 years", "No minimum age"],
          correct: 1,
          explanation: "The legal age of marriage for girls in India is 18 years under the Prohibition of Child Marriage Act.",
          reference: {
            text: "Ministry of Women and Child Development - Prohibition of Child Marriage Act",
            url: "https://wcd.nic.in/acts/prohibition-child-marriage-act-2006",
            authority: "Verified by Ministry of Women and Child Development"
          }
        },
        {
          question: "Which UN convention protects children's rights globally?",
          options: ["UNCRC", "UNHRC", "UNICEF", "UNESCO"],
          correct: 0,
          explanation: "The UN Convention on the Rights of the Child (UNCRC) is the international treaty protecting children's rights.",
          reference: {
            text: "UNICEF - Convention on the Rights of the Child",
            url: "https://www.unicef.org/child-rights-convention/convention-text",
            authority: "Verified by United Nations Children's Fund (UNICEF)"
          }
        },
        {
          question: "What percentage of seats are reserved for disadvantaged groups in private schools under RTE?",
          options: ["15%", "20%", "25%", "30%"],
          correct: 2,
          explanation: "25% of seats must be reserved for economically disadvantaged students under the Right to Education Act.",
          reference: {
            text: "RTE Act Section 12(1)(c)",
            url: "https://mhrd.gov.in/rte_rules",
            authority: "Verified by Ministry of Education, Government of India"
          }
        },
        {
          question: "What is the minimum age for employment in hazardous occupations?",
          options: ["14 years", "16 years", "18 years", "21 years"],
          correct: 2,
          explanation: "Employment of children below 18 years in hazardous occupations is prohibited under Indian law.",
          reference: {
            text: "Child Labour (Prohibition and Regulation) Amendment Act, 2016",
            url: "https://labour.gov.in/childlabour/child-labour-acts-and-rules",
            authority: "Verified by Ministry of Labour and Employment"
          }
        },
        {
          question: "Which right allows children to express their views freely?",
          options: ["Right to Property", "Right to Freedom of Expression", "Right to Vote", "Right to Travel"],
          correct: 1,
          explanation: "Freedom of Expression is a fundamental right that allows children to express their views on matters affecting them.",
          reference: {
            text: "UNCRC Article 13 - Freedom of Expression",
            url: "https://www.unicef.org/child-rights-convention/convention-text",
            authority: "Verified by United Nations Convention on the Rights of the Child"
          }
        },
        {
          question: "What is 'Gillick Competence'?",
          options: ["Sports rule", "Child's capacity to make decisions", "School grade", "Medical term"],
          correct: 1,
          explanation: "Gillick Competence refers to a child's capacity to make their own decisions about their care and treatment.",
          reference: {
            text: "Medical Council of India - Guidelines on Consent",
            url: "https://www.nmc.org.in/rules-regulations/guidelines",
            authority: "Verified by National Medical Commission"
          }
        },
        {
          question: "What is the role of Child Welfare Committee (CWC)?",
          options: ["Organize sports", "Manage schools", "Protect child rights and rehabilitation", "Provide meals"],
          correct: 2,
          explanation: "CWC is responsible for protecting child rights and ensuring rehabilitation of children in need of care and protection.",
          reference: {
            text: "Juvenile Justice (Care and Protection of Children) Act, 2015",
            url: "https://wcd.nic.in/acts/juvenile-justice-care-and-protection-children-act-2015",
            authority: "Verified by Ministry of Women and Child Development"
          }
        },
        {
          question: "Under which act is corporal punishment in schools prohibited?",
          options: ["RTE Act", "IPC", "Juvenile Justice Act", "POCSO Act"],
          correct: 0,
          explanation: "The Right to Education (RTE) Act prohibits physical punishment and mental harassment in schools.",
          reference: {
            text: "RTE Act Section 17 - Prohibition of Physical Punishment",
            url: "https://mhrd.gov.in/rte_rules",
            authority: "Verified by Ministry of Education, Government of India"
          }
        },
        {
          question: "What is the maximum punishment under POCSO Act?",
          options: ["5 years", "10 years", "20 years", "Life imprisonment"],
          correct: 3,
          explanation: "The POCSO Act provides for life imprisonment for aggravated penetrative sexual assault on children.",
          reference: {
            text: "POCSO Act Section 6 - Punishment for Aggravated Penetrative Sexual Assault",
            url: "https://wcd.nic.in/act/protection-children-sexual-offences-pocso-act-2012",
            authority: "Verified by Ministry of Women and Child Development"
          }
        },
        {
          question: "Which body monitors RTE implementation?",
          options: ["Supreme Court", "State Commission", "NCPCR", "Local Police"],
          correct: 2,
          explanation: "The National Commission for Protection of Child Rights (NCPCR) monitors RTE implementation.",
          reference: {
            text: "NCPCR - RTE Monitoring",
            url: "https://ncpcr.gov.in/index1.php?lang=1&level=0&linkid=3&lid=122",
            authority: "Verified by National Commission for Protection of Child Rights"
          }
        },
        {
          question: "What is the punishment for child labor under Indian law?",
          options: ["Warning only", "Fine only", "Imprisonment up to 1 year", "Both imprisonment and fine"],
          correct: 3,
          explanation: "Employment of children below 14 years can result in both imprisonment and fine under the Child Labor Act.",
          reference: {
            text: "Child Labor (Prohibition and Regulation) Act, 1986",
            url: "https://labour.gov.in/childlabour/child-labour-acts-and-rules",
            authority: "Verified by Ministry of Labour and Employment"
          }
        },
        {
          question: "Which of these is NOT a child's right under UNCRC?",
          options: ["Right to Education", "Right to Protection", "Right to Play", "Right to Drive"],
          correct: 3,
          explanation: "The right to drive is not a child's right under the UN Convention on the Rights of the Child (UNCRC).",
          reference: {
            text: "UNICEF - Children's Rights",
            url: "https://www.unicef.org/india/what-we-do/childrens-rights",
            authority: "Verified by United Nations Children's Fund (UNICEF)"
          }
        },
        {
          question: "What is the 'Best Interest of the Child' principle?",
          options: [
            "Giving children whatever they want",
            "Making decisions that benefit the child most",
            "Following parent's wishes only",
            "School's decision is final"
          ],
          correct: 1,
          explanation: "This principle ensures that all decisions affecting children prioritize their well-being and development.",
          reference: {
            text: "UNICEF - Best Interest of the Child",
            url: "https://www.unicef.org/india/what-we-do/childrens-rights/best-interest-child",
            authority: "Verified by United Nations Children's Fund (UNICEF)"
          }
        },
        {
          question: "What should schools have according to the RTE Act?",
          options: [
            "Swimming pool",
            "Basic infrastructure and qualified teachers",
            "International curriculum",
            "Foreign language classes"
          ],
          correct: 1,
          explanation: "RTE Act mandates schools to have basic infrastructure, qualified teachers, and maintain proper student-teacher ratios.",
          reference: {
            text: "RTE Act Section 12(1)(a)",
            url: "https://mhrd.gov.in/rte_rules",
            authority: "Verified by Ministry of Education, Government of India"
          }
        }
      ],
      image: "https://images.unsplash.com/photo-1511629091441-ee46146481b6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      id: 4,
      title: "Courtroom Simulator",
      description: "Experience real legal cases and learn about justice through interactive courtroom scenarios.",
      type: "courtroom",
      image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2070&auto=format&fit=crop"
    },
    {
      id: 5,
      title: "Match The Rights",
      description: "Match human rights with their real-world examples to learn about your fundamental rights.",
      type: "match-the-rights",
      image: "https://plus.unsplash.com/premium_photo-1681487977919-306ef7194d98?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },

    {
      id: 6,
      title: "The Rights Jar",
      description: "Pick the correct options from the jar to earn points and learn about your fundamental rights!",
      type: "rights-matching",
      image: "https://images.unsplash.com/photo-1589391886645-d51941baf7fb?q=80&w=1776&auto=format&fit=crop",
      rounds: [
        {
          rightName: "Right to Education",
          options: [
            "Free education until age 14",
            "Right to vote",
            "Right to work",
            "Right to property",
            "Right to travel"
          ],
          correct: 0,
          explanation: "The Right to Education (RTE) is a fundamental right under Article 21A of the Indian Constitution. It ensures free and compulsory education for all children between 6-14 years.",
          learnMoreLinks: [
            {
              text: "RTE Act Overview",
              url: "https://mhrd.gov.in/rte"
            },
            {
              text: "UNICEF - Education Rights",
              url: "https://www.unicef.org/india/what-we-do/education"
            }
          ],
          reference: {
            text: "RTE Act",
            url: "https://mhrd.gov.in/rte",
            authority: "Verified by Ministry of Education, Government of India"
          }
        },
        {
          rightName: "Right to Protection",
          options: [
            "Right to own property",
            "Protection from exploitation and abuse",
            "Right to drive",
            "Right to vote",
            "Right to work"
          ],
          correct: 1,
          explanation: "Every child has the right to be protected from violence, abuse, neglect, and exploitation. This is guaranteed under the POCSO Act and various other child protection laws.",
          learnMoreLinks: [
            {
              text: "Child Protection Laws",
              url: "https://ncpcr.gov.in/index.php?lang=1"
            },
            {
              text: "POCSO Act Guide",
              url: "https://wcd.nic.in/act/protection-children-sexual-offences-pocso-act-2012"
            }
          ],
          reference: {
            text: "POCSO Act",
            url: "https://wcd.nic.in/act/protection-children-sexual-offences-pocso-act-2012",
            authority: "Verified by Ministry of Women and Child Development"
          }
        },
        {
          rightName: "Right to Participation",
          options: [
            "Right to property",
            "Right to travel",
            "Voice opinions and be heard",
            "Right to work",
            "Right to drive"
          ],
          correct: 2,
          explanation: "Children have the right to express their views freely in matters affecting them. This includes participation in decision-making processes at home, school, and community.",
          learnMoreLinks: [
            {
              text: "Child Participation Guide",
              url: "https://www.unicef.org/documents/child-participation-practice"
            }
          ],
          reference: {
            text: "UNCRC Article 12",
            url: "https://www.unicef.org/child-rights-convention/convention-text",
            authority: "Verified by United Nations Convention on the Rights of the Child"
          }
        },
        {
          rightName: "Right to Development",
          options: [
            "Right to vote",
            "Right to work",
            "Right to travel",
            "Access to education and growth opportunities",
            "Right to property"
          ],
          correct: 3,
          explanation: "Every child has the right to develop to their full potential, including access to education, play, leisure, cultural activities, and information.",
          learnMoreLinks: [
            {
              text: "Child Development Rights",
              url: "https://www.ohchr.org/en/instruments-mechanisms/instruments/convention-rights-child"
            }
          ],
          reference: {
            text: "UNCRC Article 29",
            url: "https://www.unicef.org/child-rights-convention/convention-text",
            authority: "Verified by United Nations Convention on the Rights of the Child"
          }
        },
        {
          rightName: "Right to Survival",
          options: [
            "Right to work",
            "Right to travel",
            "Right to property",
            "Right to vote",
            "Basic needs and healthcare"
          ],
          correct: 4,
          explanation: "This fundamental right ensures access to basic needs like food, shelter, and healthcare. It's a core principle of child rights ensuring every child's survival and well-being.",
          learnMoreLinks: [
            {
              text: "Child Health Rights",
              url: "https://www.who.int/health-topics/child-health"
            }
          ],
          reference: {
            text: "UNCRC Article 6",
            url: "https://www.unicef.org/child-rights-convention/convention-text",
            authority: "Verified by United Nations Convention on the Rights of the Child"
          }
        }
      ],
      badge: {
        name: "Rights Champion",
        icon: "👑",
        description: "Awarded for mastering children's rights knowledge",
        criteria: "Complete all 5 rounds with at least 4 correct matches"
      }
    }
  ];

  useEffect(() => {
    const savedProgress = JSON.parse(localStorage.getItem('gameProgress')) || {};
    setTotalScore(savedProgress.totalScore || 0);
    setAchievements(savedProgress.achievements || []);
    setGameStats(savedProgress.gameStats || {
      gamesPlayed: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
    });
  }, []);

  useEffect(() => {
    let timer;
    if (selectedGame && !isQuizFinished && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [selectedGame, isQuizFinished, timeLeft]);

  useEffect(() => {
    console.log('Selected Game:', selectedGame);
  }, [selectedGame]);

  useEffect(() => {
    if (selectedGame?.type === 'rights-matching') {
      const currentOptions = selectedGame.rounds[currentRound].options;
      const correctAnswer = currentOptions[selectedGame.rounds[currentRound].correct];
      
      // Create array of option objects with original index
      const optionsWithIndex = currentOptions.map((option, index) => ({
        text: option,
        originalIndex: index
      }));
      
      // Shuffle the options
      const shuffled = shuffleArray(optionsWithIndex);
      setShuffledOptions(shuffled);
    }
  }, [selectedGame, currentRound]);

  const handleGameStart = (game) => {
    console.log('Starting game with type:', game.type);
    setSelectedGame(game);
    
    if (game.type === 'quiz' || game.type === 'interactive') {
      // Take only 5 questions for interactive scenarios
      const allQuestions = game.type === 'interactive' ? game.scenarios : game.questions;
      const shuffled = shuffleArray([...allQuestions]);
      const selectedQuestions = shuffled.slice(0, QUESTIONS_PER_TURN); // Take first 5 questions
      setShuffledQuestions(selectedQuestions);
      setCurrentQuestionIndex(0);
      setTimeLeft(30);
      setPoints(0);
      setStreak(0);
      setIsQuizFinished(false);
      setShowFeedback(false);
    } else if (game.type === 'courtroom') {
      // Reset states specific to courtroom
      setIsQuizFinished(false);
      setPoints(0);
      setTimeLeft(0); // Disable timer for courtroom
    } else if (game.type === 'rights-matching') {
      setCurrentRound(0);
      setSelectedChit(null);
      setIsExplanationVisible(false);
      setMatchedRights([]);
    }
    
    // Reset common game states
    setCurrentQuestionIndex(0);
    setQuizAnswers({});
    setStreak(0);
    setReward('');
  };

  const handleQuizComplete = () => {
    const finalPoints = points + (isCorrectAnswer ? 10 : 0);
    const newTotalScore = totalScore + finalPoints;
    
    setTotalScore(newTotalScore);
    localStorage.setItem('totalScore', newTotalScore.toString());
    
    setIsQuizFinished(true);
    checkReward(finalPoints);
    
    setGameStats(prev => ({
      ...prev,
      gamesPlayed: prev.gamesPlayed + 1
    }));
  };

  const handleAnswerSelect = (answerIndex) => {
    const currentQuestion = shuffledQuestions[currentQuestionIndex];
    const isCorrect = currentQuestion && currentQuestion.correct === answerIndex;
    setIsCorrectAnswer(isCorrect);
    setShowFeedback(true);
    
    if (isCorrect) {
      const timeBonus = Math.floor(timeLeft / 2);
      const newPoints = 10 + timeBonus + (streak * 2);
      setPoints(prevPoints => prevPoints + newPoints);
      // Add candies for correct answer
      const candyReward = 3 + Math.floor(streak / 2); // Base 3 candies + bonus for streak
      setCandies(prev => {
        const newTotal = prev + candyReward;
        localStorage.setItem('candies', newTotal.toString());
        return newTotal;
      });
      setStreak(prev => prev + 1);
      setGameStats(prev => ({
        ...prev,
        correctAnswers: prev.correctAnswers + 1,
      }));
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } else {
      setStreak(0);
      setGameStats(prev => ({
        ...prev,
        wrongAnswers: prev.wrongAnswers + 1,
      }));
    }
  };

  const handleNextQuestion = () => {
    setShowFeedback(false);
    if (currentQuestionIndex < QUESTIONS_PER_TURN - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      setTimeLeft(30);
    } else {
      handleQuizComplete();
    }
  };

  const checkReward = (newPoints) => {
    if (newPoints >= 40) {
      setReward('Knowledge Warrior');
    } else if (newPoints >= 30) {
      setReward('Quiz Champion');
    } else if (newPoints >= 20) {
      setReward('Helper Hero');
    } else if (newPoints >= 10) {
      setReward('Rights Master');
    }
  };

  const checkAchievements = (newPoints) => {
    const newAchievements = [];
    
    if (newPoints >= 100) newAchievements.push('Score Master');
    if (streak >= 5) newAchievements.push('Streak Champion');
    if (gameStats.gamesPlayed >= 10) newAchievements.push('Dedicated Player');
    
    setAchievements(prev => [...new Set([...prev, ...newAchievements])]);
  };

  const handlePlayMore = () => {
    setSelectedGame(null);
    setIsQuizFinished(false);
    setCurrentQuestionIndex(0);
    setPoints(0);
    setStreak(0);
    setTimeLeft(30);
    setReward('');
    setGameStats(prev => ({
      ...prev,
      correctAnswers: 0,
      wrongAnswers: 0
    }));
  };

  const handleAnswer = (selectedOption) => {
    const currentQ = questions[currentQuestion];
    const isCorrect = selectedOption === currentQ.correct;
    
    if (isCorrect) {
      setScore(score + 20); // 20 points per correct answer
    }
    
    setShowExplanation(true);
  };

  const handleNext = () => {
    setShowExplanation(false);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  useEffect(() => {
    let timer;
    if (selectedGame?.type === 'rights-matching' && !isExplanationVisible && !isQuizFinished && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [selectedGame, isExplanationVisible, isQuizFinished, timeLeft]);

  useEffect(() => {
    if (selectedGame?.type === 'rights-matching') {
      setTimeLeft(30);
      setPoints(0);
      setStreak(0);
      setCurrentRound(0);
      setMatchedRights([]);
      setIsQuizFinished(false);
      setIsExplanationVisible(false);
    }
  }, [selectedGame]);

  // Add this function with your other handlers
  const handleNextScenario = () => {
    setIsExplanationVisible(false);
    if (currentRound < QUESTIONS_PER_TURN - 1) {
      setCurrentRound(prevRound => prevRound + 1);
      setTimeLeft(30); // Reset timer for next scenario
    } else {
      // Handle game completion
      const finalScore = calculateFinalScore();
      setTotalScore(prev => prev + finalScore);
      setIsQuizFinished(true);
      
      // Update game stats
      setGameStats(prev => ({
        ...prev,
        gamesPlayed: prev.gamesPlayed + 1,
        totalScore: prev.totalScore + finalScore
      }));

      // Save to localStorage
      const savedScore = parseInt(localStorage.getItem('totalScore') || '0');
      localStorage.setItem('totalScore', (savedScore + finalScore).toString());
    }
  };

  // Helper function to calculate final score
  const calculateFinalScore = () => {
    const baseScore = points;
    const timeBonus = Math.floor(timeLeft * 0.5); // 0.5 points per second left
    const streakBonus = streak * 2; // 2 points per streak
    return baseScore + timeBonus + streakBonus;
  };

  return (
    <div className={`fixed inset-0 z-50 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} overflow-y-auto`}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <button 
            onClick={onClose}
            className={`px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} hover:opacity-90`}
          >
            ← Back
          </button>
          <div className="flex gap-4">
            <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}>
              <span role="img" aria-label="candy" className="text-2xl">🍬</span>
              <span className="font-bold">× {candies}</span>
              {isCorrectAnswer && showFeedback && (
                <span className="text-green-500 ml-2 animate-bounce">+{3 + Math.floor(streak / 2)}</span>
              )}
            </div>
          </div>
        </div>

        {!selectedGame ? (
          // Game Selection Screen - Grid Layout
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
            {/* Active Games */}
            {games.map((game) => (
              <div
                key={game.id}
                className={`rounded-xl shadow-lg cursor-pointer transition-transform hover:scale-[1.02] ${
                  darkMode ? 'bg-gray-800' : 'bg-white'
                }`}
              >
                <div className="h-[200px]">
                  <img
                    src={game.image}
                    alt={game.title}
                    className="w-full h-full object-cover rounded-t-xl"
                  />
                </div>
                <div className="p-6">
                  <h3 className={`text-2xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    {game.title}
                  </h3>
                  <p className={`text-lg mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {game.description}
                  </p>
                  <button
                    onClick={() => handleGameStart(game)}
                    className={`w-full px-6 py-3 rounded-lg font-semibold text-white ${
                      darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
                    }`}
                  >
                    Start Playing Now
                  </button>
                </div>
              </div>
            ))}

            {/* Placeholder Games */}
            {[1, 2].map((placeholder) => (
              <div
                key={`placeholder-${placeholder}`}
                className={`rounded-xl shadow-lg relative ${
                  darkMode ? 'bg-gray-800/50' : 'bg-white/50'
                }`}
              >
                <div className="h-[200px] bg-gray-200 rounded-t-xl">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className={`text-6xl ${darkMode ? 'text-gray-600' : 'text-gray-400'}`}>
                      🎮
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className={`text-2xl font-bold mb-3 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Coming Soon
                  </h3>
                  <p className={`text-lg mb-4 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                    {placeholder === 1 
                      ? "New exciting game mode under development!"
                      : "More challenges and adventures await!"}
                  </p>
                  <button
                    disabled
                    className={`w-full px-6 py-3 rounded-lg font-semibold text-white bg-gray-400 cursor-not-allowed`}
                  >
                    Coming Soon
                  </button>
                </div>
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-600'
                  }`}>
                    Under Development
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            {selectedGame.type === 'courtroom' ? (
              <CourtroomSimulator 
                darkMode={darkMode}
                onComplete={(score) => {
                  setPoints(score);
                  setGameStats(prev => ({
                    ...prev,
                    gamesPlayed: prev.gamesPlayed + 1,
                  }));
                  setIsQuizFinished(true);
                }}
              />
            ) : selectedGame.type === 'match-the-rights' ? ( // Add this case for the new game type
              <RightsMatchingGame 
                darkMode={darkMode}
                onComplete={(candies) => {
                  setCandies(prev => prev + candies);
                  setGameStats(prev => ({
                    ...prev,
                    gamesPlayed: prev.gamesPlayed + 1,
                  }));
                  setIsQuizFinished(true);
                }}
                onClose={onClose}
              />
            ) : isQuizFinished ? (
              // Results Screen
              <div className={`p-8 rounded-xl shadow-lg text-center ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <h2 className={`text-3xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  Quiz Complete!
                </h2>
                <div className={`text-xl mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  Round Score: {points}
                </div>
                <div className={`text-2xl mb-6 ${darkMode ? 'text-white' : 'text-gray-800'} flex items-center justify-center gap-2`}>
                  <span role="img" aria-label="candy" className="text-3xl">🍬</span>
                  <span>Total Candies: {candies}</span>
                </div>
                {reward && (
                  <div className="text-lg text-yellow-500 font-bold mb-6">
                    🏆 Achievement Unlocked: {reward}
                  </div>
                )}
                <div className="grid grid-cols-2 gap-4 mt-8">
                  <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Correct Answers</div>
                    <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                      {gameStats.correctAnswers}
                    </div>
                  </div>
                  <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Best Streak</div>
                    <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                      {streak}
                    </div>
                  </div>
                </div>
                <div className="mt-8 space-x-4">
                  <button
                    onClick={handlePlayMore}
                    className={`px-6 py-3 rounded-lg font-semibold text-white ${
                      darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
                    }`}
                  >
                    Play More Games
                  </button>
                </div>
              </div>
            ) : (
              // Question Screen
              <div>
                {/* Stats Bar */}
                <div className={`mb-6 p-4 rounded-xl shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                  <div className="grid grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Question</div>
                      <div className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                        {currentQuestionIndex + 1}/{QUESTIONS_PER_TURN}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Time</div>
                      <div className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                        {timeLeft}s
                      </div>
                    </div>
                    <div className="text-center">
                      <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Streak</div>
                      <div className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                        {streak} 🔥
                      </div>
                    </div>
                    <div className="text-center">
                      <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Score</div>
                      <div className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                        {points}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Question Card */}
                <div className={`p-8 rounded-xl shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                  <h2 className={`text-2xl font-bold text-center mb-8 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    {selectedGame.type === 'interactive'
                      ? shuffledQuestions[currentQuestionIndex]?.situation
                      : shuffledQuestions[currentQuestionIndex]?.question}
                  </h2>
                  
                  {!showFeedback ? (
                    // Answer Options
                    <div className="space-y-4 max-w-2xl mx-auto">
                      {shuffledQuestions[currentQuestionIndex]?.options?.map((option, index) => (
                        <button
                          key={index}
                          onClick={() => handleAnswerSelect(index)}
                          className={`w-full p-4 text-left rounded-lg transition-colors ${
                            darkMode
                              ? 'bg-gray-700 hover:bg-gray-600 text-white'
                              : 'bg-gray-50 hover:bg-gray-100 text-gray-800'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  ) : (
                    // Feedback Section
                    <div className="space-y-6 max-w-2xl mx-auto">
                      <div className={`p-6 rounded-lg ${
                        isCorrectAnswer 
                          ? 'bg-green-100 border-2 border-green-500' 
                          : 'bg-red-100 border-2 border-red-500'
                      }`}>
                        <div className="flex items-center gap-3 mb-4">
                          {isCorrectAnswer ? (
                            <div className="text-green-600 text-xl">✓ Correct!</div>
                          ) : (
                            <div className="text-red-600 text-xl">✗ Incorrect</div>
                          )}
                        </div>
                        
                        <div className={`mb-4 ${darkMode ? 'text-gray-800' : 'text-gray-700'}`}>
                          <strong>Correct Answer:</strong> {
                            shuffledQuestions[currentQuestionIndex]?.options[
                              shuffledQuestions[currentQuestionIndex]?.correct
                            ]
                          }
                        </div>
                        
                        <div className={`${darkMode ? 'text-gray-800' : 'text-gray-700'}`}>
                          <strong>Explanation:</strong> {
                            shuffledQuestions[currentQuestionIndex]?.explanation
                          }
                        </div>
                        
                        {/* Reference Section - Explicitly check if reference exists */}
                        {shuffledQuestions[currentQuestionIndex]?.reference && (
                          <div className="mt-4 p-4 bg-white rounded-lg shadow-sm">
                            <div className="font-semibold text-gray-800">Source:</div>
                            <a 
                              href={shuffledQuestions[currentQuestionIndex].reference.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline block mt-1"
                            >
                              {shuffledQuestions[currentQuestionIndex].reference.text}
                            </a>
                            <div className="text-sm text-gray-600 italic mt-2">
                              {shuffledQuestions[currentQuestionIndex].reference.authority}
                            </div>
                          </div>
                        )}
                      </div>

                      <button
                        onClick={handleNextQuestion}
                        className={`w-full p-4 text-center rounded-lg font-semibold text-white ${
                          darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
                        }`}
                      >
                        {currentQuestionIndex < shuffledQuestions.length - 1 
                          ? 'Next Question' 
                          : 'Complete Quiz'}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
            {selectedGame?.type === 'rights-matching' && !isQuizFinished && (
              <div className={`p-8 rounded-xl shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="text-center mb-8">
                  <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    Round {currentRound + 1}: Match the Right
                  </h2>
                  <p className={`text-xl mt-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    {selectedGame.rounds[currentRound].rightName}
                  </p>
                </div>

                {!isExplanationVisible ? (
                  <div className="relative">
                    {/* Stats Bar */}
                    <div className={`mb-6 p-4 rounded-xl shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                      <div className="grid grid-cols-4 gap-4">
                        <div className="text-center">
                          <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Question</div>
                          <div className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                            {currentRound + 1}/5
                          </div>
                        </div>
                        <div className="text-center">
                          <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Time</div>
                          <div className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                            {timeLeft}s
                          </div>
                        </div>
                        <div className="text-center">
                          <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Streak</div>
                          <div className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                            {streak} 🔥
                          </div>
                        </div>
                        <div className="text-center">
                          <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Score</div>
                          <div className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                            {points}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Jar Container */}
                    <div className="relative w-[400px] mx-auto">
                      {/* Jar Top */}
                      <div className="h-8 w-full bg-blue-200/30 rounded-t-full"></div>
                      
                      {/* Jar Body */}
                      <div className="relative h-[400px] bg-blue-100/20 backdrop-blur-sm border-2 border-blue-200/50 rounded-b-3xl px-6 py-8">
                        {/* Paper Chits Container */}
                        <div className="grid grid-cols-1 gap-4 h-full place-content-center">
                          {shuffledOptions.map((option, index) => (
                            <motion.button
                              key={index}
                              initial={{ rotate: Math.random() * 10 - 5 }}
                              whileHover={{ 
                                scale: 1.05, 
                                rotate: 0,
                                y: -10,
                                transition: { duration: 0.2 }
                              }}
                              whileTap={{ scale: 0.95 }}
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setSelectedChit(index);
                                
                                const isCorrect = option.originalIndex === selectedGame.rounds[currentRound].correct;
                                setIsCorrectAnswer(isCorrect);
                                
                                if (isCorrect) {
                                  // Update streak and points
                                  setStreak(prev => prev + 1);
                                  const timeBonus = Math.floor(timeLeft / 2);
                                  const streakBonus = streak * 2;
                                  const newPoints = 10 + timeBonus + streakBonus;
                                  setPoints(prev => prev + newPoints);
                                  
                                  // Add to matched rights
                                  setMatchedRights(prev => [...prev, currentRound]);
                                  
                                  // Trigger confetti
                                  confetti({
                                    particleCount: 100,
                                    spread: 70,
                                    origin: { y: 0.6 }
                                  });
                                  
                                  // Update game stats
                                  setGameStats(prev => ({
                                    ...prev,
                                    correctAnswers: prev.correctAnswers + 1,
                                  }));
                                  
                                  // Add candies
                                  const candyReward = 3 + Math.floor(streak / 2);
                                  setCandies(prev => {
                                    const newTotal = prev + candyReward;
                                    localStorage.setItem('candies', newTotal.toString());
                                    return newTotal;
                                  });
                                } else {
                                  // Reset streak on wrong answer
                                  setStreak(0);
                                  setGameStats(prev => ({
                                    ...prev,
                                    wrongAnswers: prev.wrongAnswers + 1,
                                  }));
                                }
                                
                                setIsExplanationVisible(true);
                              }}
                              className={`
                                relative p-4 rounded-lg text-center transform
                                ${darkMode 
                                  ? 'bg-yellow-50 text-gray-800 shadow-inner' 
                                  : 'bg-white text-gray-800 shadow-md'
                                }
                                hover:shadow-lg transition-all duration-200
                                before:absolute before:inset-0 before:bg-gradient-to-b before:from-yellow-50/50 before:to-transparent before:rounded-lg
                                cursor-pointer
                                z-10
                              `}
                              style={{
                                transform: `rotate(${Math.random() * 10 - 5}deg)`,
                              }}
                            >
                              {/* Paper fold effect */}
                              <div className="absolute top-0 right-0 w-0 h-0 border-t-8 border-r-8 border-t-yellow-200/50 border-r-transparent"></div>
                              <span className="relative z-10 font-medium pointer-events-none">{option.text}</span>
                            </motion.button>
                          ))}
                        </div>

                        {/* Jar Shine Effect */}
                        <div className="absolute top-0 left-1/4 w-1/2 h-full bg-gradient-to-br from-white/10 to-transparent rounded-full pointer-events-none"></div>
                      </div>

                      {/* Jar Bottom Shadow */}
                      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-4 bg-black/10 blur-md rounded-full pointer-events-none"></div>
                    </div>

                    {/* Decorative Elements */}
                    <motion.div
                      className="absolute -top-4 right-1/4 text-4xl pointer-events-none"
                      animate={{ 
                        y: [0, -10, 0],
                        rotate: [0, 5, 0]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                    >
                      ✨
                    </motion.div>
                    <motion.div
                      className="absolute -bottom-4 left-1/4 text-4xl pointer-events-none"
                      animate={{ 
                        y: [0, 10, 0],
                        rotate: [0, -5, 0]
                      }}
                      transition={{ 
                        duration: 2.5,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                    >
                      ✨
                    </motion.div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className={`p-6 rounded-lg ${
                      selectedChit === selectedGame.rounds[currentRound].correct
                        ? 'bg-green-100 border-2 border-green-500'
                        : 'bg-red-100 border-2 border-red-500'
                    }`}>
                      <div className="mb-4">
                        <strong>Explanation:</strong> {selectedGame.rounds[currentRound].explanation}
                      </div>
                      <div className="mt-4">
                        <strong>Learn More:</strong>
                        <ul className="list-disc ml-6 mt-2">
                          {selectedGame.rounds[currentRound].learnMoreLinks.map((link, index) => (
                            <li key={index}>
                              <a 
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:underline"
                              >
                                {link.text}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        if (currentRound < selectedGame.rounds.length - 1) {
                          setCurrentRound(currentRound + 1);
                          setSelectedChit(null);
                          setIsExplanationVisible(false);
                          setTimeLeft(30); // Reset timer for next round
                        } else {
                          // Game completion logic
                          const finalScore = points;
                          setTotalScore(prev => prev + finalScore);
                          localStorage.setItem('totalScore', (totalScore + finalScore).toString());
                          
                          // Check for badge achievement
                          if (matchedRights.length >= 4) {
                            setAchievements(prev => {
                              const newAchievements = [...prev, selectedGame.badge.name];
                              localStorage.setItem('achievements', JSON.stringify(newAchievements));
                              return newAchievements;
                            });
                          }
                          
                          // Set reward based on performance
                          if (finalScore >= 200) {
                            setReward('Rights Grand Master');
                          } else if (finalScore >= 150) {
                            setReward('Rights Champion');
                          } else if (finalScore >= 100) {
                            setReward('Rights Expert');
                          } else if (finalScore >= 50) {
                            setReward('Rights Apprentice');
                          }
                          
                          setIsQuizFinished(true);
                          setGameStats(prev => ({
                            ...prev,
                            gamesPlayed: prev.gamesPlayed + 1,
                          }));
                        }
                      }}
                      className={`w-full p-4 text-center rounded-lg font-semibold text-white ${
                        darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
                      }`}
                    >
                      {currentRound < selectedGame.rounds.length - 1 ? 'Next Round' : 'Complete Game'}
                    </button>
                  </div>
                )}
              </div>
            )}
            {selectedGame?.type === 'interactive' && isExplanationVisible && (
              <div className="mt-6">
                <div className={`p-6 rounded-lg ${
                  isCorrectAnswer 
                    ? 'bg-green-100 border-2 border-green-500' 
                    : 'bg-red-100 border-2 border-red-500'
                }`}>
                  {/* Result Header */}
                  <div className="text-xl font-bold mb-4">
                    {isCorrectAnswer ? '✓ Correct!' : '✗ Incorrect!'}
                  </div>

                  {/* Correct Answer */}
                  <div className="mb-4">
                    <div className="font-semibold">Correct Answer:</div>
                    <div className="mt-1">
                      {selectedGame.scenarios[currentRound].options[selectedGame.scenarios[currentRound].correct]}
                    </div>
                  </div>

                  {/* Explanation */}
                  <div className="mb-4">
                    <div className="font-semibold">Explanation:</div>
                    <div className="mt-1">
                      {selectedGame.scenarios[currentRound].explanation}
                    </div>
                  </div>

                  {/* Reference Section */}
                  <div className="mt-4 p-4 bg-white rounded-lg shadow-sm">
                    <div className="font-semibold text-gray-800">Source:</div>
                    <a 
                      href={selectedGame.scenarios[currentRound].reference.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline block mt-1"
                    >
                      {selectedGame.scenarios[currentRound].reference.text}
                    </a>
                    <div className="text-sm text-gray-600 italic mt-2">
                      {selectedGame.scenarios[currentRound].reference.authority}
                    </div>
                  </div>
                </div>

                {/* Next Button */}
                <button
                  onClick={handleNextScenario}
                  className={`w-full mt-4 p-4 text-center rounded-lg font-semibold text-white
                    ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'}
                    transition-colors duration-200`}
                >
                  {currentRound < selectedGame.scenarios.length - 1 ? 'Next Scenario' : 'Complete Game'}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const styles = `
.quiz-card-horizontal {
  @apply flex items-stretch rounded-xl shadow-lg overflow-hidden cursor-pointer transition-all duration-300;
}

.quiz-image-container {
  @apply w-1/3 relative overflow-hidden;
}

.quiz-image {
  @apply w-full h-full object-cover;
}

.quiz-content {
  @apply w-2/3 p-8 flex flex-col justify-between;
}

.quiz-title {
  @apply text-2xl font-bold mb-4;
}

.quiz-description {
  @apply text-lg mb-6;
}

.start-quiz-btn {
  @apply text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300 w-fit;
}

.stats-bar {
  @apply mb-6 rounded-xl shadow-lg;
}

.stat-item {
  @apply flex flex-col items-center;
}

.stat-label {
  @apply text-sm opacity-75;
}

.stat-value {
  @apply text-lg font-bold;
}

.question-card {
  @apply p-8 rounded-xl shadow-lg;
}

.question-content {
  @apply flex flex-col items-center text-center;
}

.question-text {
  @apply text-2xl font-bold mb-8;
}

.options-grid {
  @apply grid grid-cols-1 gap-4 w-full max-w-2xl mx-auto;
}

.option-button {
  @apply w-full p-4 rounded-lg text-left transition-colors duration-300;
}

.jar-shine {
  background: linear-gradient(
    45deg,
    transparent 0%,
    rgba(255, 255, 255, 0.1) 50%,
    transparent 100%
  );
}

.paper-chit {
  background: linear-gradient(to bottom right, #fff9c4, #fff59d);
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
}

.paper-fold {
  position: absolute;
  top: 0;
  right: 0;
  border-style: solid;
  border-width: 0 12px 12px 0;
  border-color: transparent #fff59d transparent transparent;
}
`;

export default GameSection;