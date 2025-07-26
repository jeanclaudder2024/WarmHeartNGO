export interface Blog {
  id: number;
  title: {
    en: string;
    ar: string;
  };
  date: string;
  image: string;
  excerpt: {
    en: string;
    ar: string;
  };
  content: {
    en: string;
    ar: string;
  };
}

export const blogs: Blog[] = [
  {
    id: 1,
    title: {
      en: "Building a Better Future Through Education",
      ar: "بناء مستقبل أفضل من خلال التعليم"
    },
    date: "2023-10-15",
    image: "https://images.pexels.com/photos/256431/pexels-photo-256431.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    excerpt: {
      en: "How our educational programs are helping children from underprivileged communities achieve their dreams.",
      ar: "كيف تساعد برامجنا التعليمية الأطفال من المجتمعات المحرومة على تحقيق أحلامهم."
    },
    content: {
      en: "Education is often referred to as the great equalizer, and at Warm Heart, we firmly believe in its power to transform lives. Through our dedicated educational programs, we've been working tirelessly to provide quality learning opportunities for children from underprivileged communities.\n\nIn the past year alone, we've established 15 new learning centers in remote areas, providing access to education for over 500 children who previously had limited or no educational opportunities. Our approach goes beyond traditional classroom learning – we focus on holistic development, incorporating creativity, critical thinking, and life skills into our curriculum.\n\nOur dedicated team of educators, many of whom come from the communities we serve, are not just teachers but mentors and role models. They understand the unique challenges these children face and are committed to helping them overcome barriers to learning.\n\nOne of our success stories is that of Mia, a 12-year-old girl from a remote village who showed exceptional aptitude for mathematics. Through our program, she was able to access resources and guidance that helped her excel. Today, she's preparing to participate in a national mathematics competition – an opportunity she might never have had without educational support.\n\nWe believe that every child deserves a chance to learn, grow, and dream. With your continued support, we can reach even more communities and help more children like Mia achieve their full potential.",
      ar: "غالبًا ما يشار إلى التعليم باعتباره المساواة العظيمة، ونحن في القلب الدافئ نؤمن بقوة بقدرته على تغيير الحياة. من خلال برامجنا التعليمية المخصصة، عملنا بلا كلل لتوفير فرص تعليمية جيدة للأطفال من المجتمعات المحرومة.\n\nفي العام الماضي وحده، أنشأنا 15 مركزًا تعليميًا جديدًا في المناطق النائية، مما أتاح الوصول إلى التعليم لأكثر من 500 طفل كانت لديهم فرص تعليمية محدودة أو معدومة من قبل. يتجاوز نهجنا التعلم التقليدي في الفصول الدراسية - نركز على التنمية الشاملة، ودمج الإبداع والتفكير النقدي والمهارات الحياتية في منهجنا.\n\nفريقنا المخصص من المعلمين، الكثير منهم يأتون من المجتمعات التي نخدمها، ليسوا مجرد معلمين ولكنهم مرشدين وقدوة. إنهم يتفهمون التحديات الفريدة التي يواجهها هؤلاء الأطفال وملتزمون بمساعدتهم على التغلب على عوائق التعلم.\n\nإحدى قصص نجاحنا هي قصة ميا، فتاة تبلغ من العمر 12 عامًا من قرية نائية أظهرت براعة استثنائية في الرياضيات. من خلال برنامجنا، تمكنت من الوصول إلى الموارد والتوجيه اللذين ساعداها على التفوق. اليوم، تستعد للمشاركة في مسابقة رياضيات وطنية - وهي فرصة ربما لم تكن لديها أبدًا بدون الدعم التعليمي.\n\nنحن نؤمن بأن كل طفل يستحق فرصة للتعلم والنمو والحلم. بدعمكم المستمر، يمكننا الوصول إلى المزيد من المجتمعات ومساعدة المزيد من الأطفال مثل ميا على تحقيق إمكاناتهم الكاملة."
    }
  },
  {
    id: 2,
    title: {
      en: "Clean Water Initiative Transforms Rural Communities",
      ar: "مبادرة المياه النظيفة تحول المجتمعات الريفية"
    },
    date: "2023-09-20",
    image: "https://images.pexels.com/photos/2486168/pexels-photo-2486168.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    excerpt: {
      en: "Our clean water project has provided sustainable access to safe drinking water for over 10,000 people in rural areas.",
      ar: "وفر مشروع المياه النظيفة لدينا وصولاً مستدامًا إلى مياه الشرب الآمنة لأكثر من 10,000 شخص في المناطق الريفية."
    },
    content: {
      en: "Access to clean, safe drinking water is a fundamental human right, yet millions around the world still struggle to access this basic necessity. At Warm Heart, we've made it our mission to address this critical issue through our Clean Water Initiative.\n\nLaunched three years ago, our initiative has now reached over 20 rural communities, providing sustainable access to safe drinking water for more than 10,000 people. We've implemented a multi-faceted approach, combining the installation of water purification systems, construction of wells in water-scarce areas, and community education on water conservation and hygiene practices.\n\nThe impact has been transformative. In the village of Nadira, where residents previously had to walk several kilometers each day to collect water from contaminated sources, we've installed a community well and filtration system. This has not only provided immediate access to clean water but has also had ripple effects throughout the community.\n\nWomen and children, who typically bore the burden of water collection, now have time for education and other productive activities. Waterborne illnesses, once common in the village, have decreased by over 70% according to local health officials. Agriculture has improved with access to cleaner irrigation water, enhancing food security and livelihoods.\n\nCrucially, our approach emphasizes community ownership and sustainability. Local residents are trained in the maintenance of water systems and lead their own water management committees. This ensures that the benefits of our initiative continue long after our initial intervention.\n\nClean water is not just about health – it's about dignity, opportunity, and the foundation for communities to thrive. With continued support, we aim to expand our Clean Water Initiative to reach 50 more communities in the next two years, transforming thousands more lives through the simple but profound gift of clean water.",
      ar: "الوصول إلى مياه الشرب النظيفة والآمنة هو حق أساسي من حقوق الإنسان، ومع ذلك لا يزال الملايين حول العالم يكافحون للوصول إلى هذه الضرورة الأساسية. في القلب الدافئ، جعلنا مهمتنا معالجة هذه القضية الحرجة من خلال مبادرة المياه النظيفة لدينا.\n\nأطلقت مبادرتنا قبل ثلاث سنوات، وقد وصلت الآن إلى أكثر من 20 مجتمعًا ريفيًا، مما وفر وصولاً مستدامًا إلى مياه الشرب الآمنة لأكثر من 10,000 شخص. لقد نفذنا نهجًا متعدد الأوجه، يجمع بين تركيب أنظمة تنقية المياه، وبناء الآبار في المناطق التي تعاني من ندرة المياه، وتثقيف المجتمع بشأن ممارسات الحفاظ على المياه والنظافة.\n\nكان التأثير تحويليًا. في قرية نديرة، حيث كان السكان يضطرون سابقًا للسير عدة كيلومترات يوميًا لجمع المياه من مصادر ملوثة، قمنا بتركيب بئر مجتمعي ونظام ترشيح. وقد أدى ذلك ليس فقط إلى توفير وصول فوري إلى المياه النظيفة ولكن كان له أيضًا تأثيرات متتالية في جميع أنحاء المجتمع.\n\nالنساء والأطفال، الذين كانوا يتحملون عادة عبء جمع المياه، لديهم الآن وقت للتعليم وغيرها من الأنشطة المنتجة. انخفضت الأمراض المنقولة بالمياه، التي كانت شائعة في القرية، بنسبة تزيد عن 70٪ وفقًا للمسؤولين الصحيين المحليين. تحسنت الزراعة مع الوصول إلى مياه ري أنظف، مما عزز الأمن الغذائي وسبل العيش.\n\nوالأهم من ذلك، يؤكد نهجنا على ملكية المجتمع والاستدامة. يتم تدريب السكان المحليين على صيانة أنظمة المياه ويقودون لجان إدارة المياه الخاصة بهم. وهذا يضمن استمرار فوائد مبادرتنا لفترة طويلة بعد تدخلنا الأولي.\n\nالمياه النظيفة لا تتعلق بالصحة فحسب - بل تتعلق بالكرامة والفرص والأساس لازدهار المجتمعات. مع الدعم المستمر، نهدف إلى توسيع مبادرة المياه النظيفة لدينا للوصول إلى 50 مجتمعًا آخر في العامين المقبلين، وتحويل آلاف الحيوات الأخرى من خلال هدية المياه النظيفة البسيطة ولكن العميقة."
    }
  },
  {
    id: 3,
    title: {
      en: "Volunteer Spotlight: Meet the Heroes Behind Our Mission",
      ar: "تسليط الضوء على المتطوعين: تعرف على الأبطال وراء مهمتنا"
    },
    date: "2023-08-05",
    image: "https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    excerpt: {
      en: "A look at the dedicated volunteers who make our work possible and the incredible impact they have on communities.",
      ar: "نظرة على المتطوعين المتفانين الذين يجعلون عملنا ممكنًا والأثر المذهل الذي يحدثونه في المجتمعات."
    },
    content: {
      en: "Behind every successful Warm Heart initiative are countless dedicated volunteers who give their time, skills, and compassion to make a difference. This month, we want to shine a spotlight on these everyday heroes whose commitment drives our mission forward.\n\nOur volunteer network now spans 12 countries and includes over 1,500 active participants from all walks of life – students, professionals, retirees, and more. What unites them is their shared belief in our vision and their desire to create positive change in their communities and beyond.\n\nSara, a retired teacher from Madrid, has volunteered with our literacy program for the past four years. 'After 35 years in the classroom, I wasn't ready to stop teaching,' she shares. 'Working with adults who are learning to read for the first time is incredibly rewarding. It's never too late to open the door to education.' Sara has helped over 50 adults achieve literacy, transforming not only their lives but often the prospects of entire families.\n\nIn Nairobi, Jamal coordinates our weekend food distribution program. A banker by profession, he dedicates his weekends to ensuring that vulnerable families receive nutritious meals. 'We're more than just food providers,' Jamal explains. 'We build relationships, understand needs, and connect people with other resources. Sometimes the most important thing we offer is dignity and respect.'\n\nYoung volunteers like Maya, a 16-year-old student, represent the next generation of changemakers. Maya started a Warm Heart club at her school that now has 30 members. 'We don't just fundraise; we educate ourselves and others about global issues and take meaningful action,' she says proudly.\n\nVolunteers not only give; they receive profound benefits in return. Many report greater life satisfaction, new friendships, valuable skills, and a broader perspective on the world.\n\nAs Warm Heart grows, we remain committed to creating meaningful volunteer experiences that respect the skills, time, and motivation of each individual. After all, volunteers are not just supporters of our mission—they are the heart of it.",
      ar: "خلف كل مبادرة ناجحة للقلب الدافئ يوجد عدد لا يحصى من المتطوعين المتفانين الذين يقدمون وقتهم ومهاراتهم وتعاطفهم لإحداث فرق. هذا الشهر، نريد تسليط الضوء على هؤلاء الأبطال اليوميين الذين يدفع التزامهم مهمتنا إلى الأمام.\n\nتمتد شبكة المتطوعين لدينا الآن إلى 12 دولة وتشمل أكثر من 1500 مشارك نشط من جميع مناحي الحياة - الطلاب والمهنيين والمتقاعدين والمزيد. ما يوحدهم هو إيمانهم المشترك برؤيتنا ورغبتهم في إحداث تغيير إيجابي في مجتمعاتهم وخارجها.\n\nسارة، مدرسة متقاعدة من مدريد، تطوعت في برنامج محو الأمية لدينا على مدى السنوات الأربع الماضية. 'بعد 35 عامًا في الفصل الدراسي، لم أكن مستعدة للتوقف عن التدريس،' تشارك. 'العمل مع البالغين الذين يتعلمون القراءة لأول مرة مجزٍ بشكل لا يصدق. لم يفت الأوان أبدًا لفتح باب التعليم.' ساعدت سارة أكثر من 50 شخصًا بالغًا على تحقيق الإلمام بالقراءة والكتابة، مما غير ليس فقط حياتهم ولكن غالبًا آفاق عائلات بأكملها.\n\nفي نيروبي، ينسق جمال برنامج توزيع الطعام في عطلة نهاية الأسبوع لدينا. وهو مصرفي محترف، يكرس عطلات نهاية الأسبوع لضمان حصول الأسر الضعيفة على وجبات مغذية. 'نحن أكثر من مجرد مقدمي طعام،' يشرح جمال. 'نحن نبني العلاقات، ونفهم الاحتياجات، ونربط الناس بالموارد الأخرى. في بعض الأحيان، أهم شيء نقدمه هو الكرامة والاحترام.'\n\nالمتطوعون الشباب مثل مايا، طالبة تبلغ من العمر 16 عامًا، يمثلون الجيل القادم من صانعي التغيير. بدأت مايا نادي القلب الدافئ في مدرستها الذي يضم الآن 30 عضوًا. 'نحن لا نجمع الأموال فقط؛ نحن نثقف أنفسنا والآخرين حول القضايا العالمية ونتخذ إجراءات هادفة،' تقول بفخر.\n\nالمتطوعون لا يعطون فقط؛ يتلقون فوائد عميقة في المقابل. يبلغ العديد عن رضا أكبر عن الحياة، وصداقات جديدة، ومهارات قيمة، ومنظور أوسع للعالم.\n\nمع نمو القلب الدافئ، نظل ملتزمين بخلق تجارب تطوعية هادفة تحترم مهارات ووقت ودوافع كل فرد. بعد كل شيء، المتطوعون ليسوا مجرد داعمين لمهمتنا - هم قلبها."
    }
  }
];