const translations = {
    en: {
        blackBelt:
            'The aim of the <a href="https://www.ni.com/">NI</a> project was to improve the performance of the company\'s websites. Within a few months, we ' +
            'achieved ~30% improvement, and then gradually improved the performance. In addition, we created a JavasScript-based design system. Its primary ' +
            'purpose was to create a common component library for the 4 frontend frameworks used within the company. We used Storybook to document this.',
        computerScience: 'Computer science (BSc)',
        contacts: 'Contacts',
        deik: 'University of Debrecen',
        dynataSummary1:
            'The company has a huge database that includes a versatile UI based on AngularJS. My responsibilities included maintaining it, adding new ' +
            'components, fixing any bugs that arise. I worked on this as a member of a team of 5-8 people working with agile methodology for 5 years, where ' +
            'I reported to the American stakeholders on a weekly basis.',
        dynataSummary2: 'In Angular, we created an admin interface for this database and UI.',
        dynataSummary3:
            'After our company merged with another company, we had a lot of UIs using different technologies. We wrote a server application in NestJS. Its ' +
            'main purpose was to navigate and authenticate between different applications. I was involved in the architectural design of this.',
        dynataSummary4: 'At that time, it was one of my responsibilities to write the simpler version of our core UI in React.',
        dynataSummary5:
            'Before we switched to AngularJS, my main tasks included the maintenance and development of the frontend using the JSF-based (Primefaces) ' +
            'framework and the related database.',
        dynataSummary6:
            'I have been a regular speaker at several professional events (eg. conferences, meetups) and have been mentoring beginners in the field as well.',
        english: 'English',
        informaticsMajor: 'Informatics major',
        hobbyProjects: 'Hobby projects',
        languageSkills: 'Language skills',
        mobxPieDescription: 'An example repository is how to use MobX version 3.X with React.',
        name: 'Tamás Hadas',
        present: 'present',
        professionalExperience: 'Professional experience',
        programmingSkills: 'Programming skills',
        studies: 'Studies',
        thesis: 'Thesis',
        thesisTitle: 'Gomoku game server with XMPP protocol'
    },
    hu: {
        blackBelt:
            'Az <a href="https://www.ni.com/">NI</a>-os projekt célja a céghez tartozó weboldalak performanciájának fejlesztése volt. Pár hónapon belül ' +
            '~30%-os javulást értünk el, majd fokozatosan javítottunk a teljesítményen. Ezen kívül egy tisztán JavaScript alapú design systemet hoztunk ' +
            'létre, amely elsődleges célja az volt, hogy a cégen belül használt 4 frontend frameworknek legyen egy közös component libraryje. Ennek ' +
            'dokumentáláshoz Storybookot használtunk.',
        computerScience: 'Programtervező informatikus (BSc)',
        contacts: 'Elérhetőségek',
        deik: 'Debreceni Egyetem Informatikai Kar',
        dynataSummary1:
            'A cég rendelkezik egy hatalmas adatbázissal, amelyhez tartozik egy sokrétű UI, amely AngularJS-re épül. A feladataim közé tartozott ennek ' +
            'karbantartása, új komponensek hozzáadása, a felmerülő bugok kijavítása. Ezen egy 5-8 fős agilis módszertannal dolgozó csapat tagjaként ' +
            'dolgoztam 5 éven keresztül, ahol heti rendszerességgel jelentettem az amerikai stakeholdernek.',
        dynataSummary2: 'Angularban készítettünk ehhez az adatbázishoz és UI-hoz egy admin felületet.',
        dynataSummary3:
            'Miután cégünk összeolvadt egy másik céggel rengeteg különböző technológiát használó UI-unk volt. Ehhez NestJS-ben írtunk egy kiszolgáló ' +
            'alkalmazást, melynek fő célja a különböző alkalmazások között való navigálás és authentikálás volt. Ennek architekturális tervezésében vettem ' +
            'részt.',
        dynataSummary4: 'Ekkoriban feladataim közé tartozott még a fő frontend alkalmazásunk egyszerűsített verziójának megírása React-ban.',
        dynataSummary5:
            'Mielőtt AngularJS-re tértünk volna át a fő feladataim közé tartozott a JSF alapú (Primefaces) keretrendszert használó frontend és a ' +
            'hozzátartozó adatbázis karbantartása, fejlesztése.',
        dynataSummary6: 'Rendezvényeken rendszeres előadó voltam és mentorálással is foglalkoztam.',
        english: 'Angol',
        hobbyProjects: 'Hobbi projektek',
        informaticsMajor: 'Informatika szak',
        languageSkills: 'Nyelvismeretek',
        mobxPieDescription: 'Egy példa repository, hogy (szerintem) hogyan érdemes a MobX 3.X verzióját React-tal használni.',
        name: 'Hadas Tamás',
        present: 'jelenleg',
        professionalExperience: 'Szakmai tapasztalat',
        programmingSkills: 'Programozási ismeretek',
        studies: 'Tanulmányok',
        thesis: 'Szakdolgozat',
        thesisTitle: 'Amőba játék szerver XMPP protokollal'
    }
};

export default function CVBuilder(lang) {
    const translation = translations[lang];
    const style = document.createElement('style');
    style.innerHTML = '@import "./src/files/style.css";';

    const body = document.createElement('div');
    body.className = 'flex flex-row flex-start';
    body.id = 'body';
    body.innerHTML = `
        <aside class="flex flex-column">
            <img alt="" src="./assets/images/cv.jpg">
                <div>
                    <h2>${translation.programmingSkills}</h2>
                    <p>AngularJS, Angular, React, JavaScript, Typescript, CSS (Sass, Less), Java, MSSQL, Jira, TeamCity</p>
                </div>
                <div class="flex-fill">
                    <h2>${translation.languageSkills}</h2>
                    <ul>
                        <li>
                            <div class="language-skills flex flex-row flex-start">
                                <span class="flex-fill">${translation.english}</span>
                                <div class="flex-fill">B2</div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div>
                    <h2>${translation.contacts}</h2>
                    <ul>
                        <li>
                            <div class="contact flex flex-row flex-start">
                                <i class="fa fa-home"></i>
                                <span>4028, Debrecen Gáborjáni Szabó Kálmán utca 5. 13. ajtó</span>
                            </div>
                        </li>
                        <li>
                            <div class="contact flex flex-row flex-start">
                                <i class="fa fa-phone"></i>
                                <a href="tel:+36706205150">+(36) 70/620-5150</a>
                            </div>
                        </li>
                        <li>
                            <div class="contact flex flex-row flex-start">
                                <i class="fa fa-envelope"></i>
                                <a href="mailto:hadastk@gmail.com">hadastk@gmail.com</a>
                            </div>
                        </li>
                        <li>
                            <div class="contact text-center">
                                <a href="https://tkolok.github.io/">
                                    <i class="fa fa-link"></i>
                                </a>
                                <a href="https://github.com/tkolok">
                                    <i class="fa fa-github"></i>
                                </a>
                                <a href="https://www.linkedin.com/in/tam%C3%A1s-hadas-a009bb13a/">
                                    <i class="fa fa-linkedin-square"></i>
                                </a>
                            </div>
                        </li>
                    </ul>
                </div>
        </aside>
        <main class="flex-fill">
            <h1>${translation.name}</h1>
            <div>
                <h2>${translation.professionalExperience}</h2>
                <section>
                    <h3>
                        <a href="https://blackbelt.hu/">BlackBelt</a>
                        <span>Front End Developer</span>
                    </h3>
                    <small>2021 - ${translation.present}</small>
                    <p>${translation.blackBelt}</p>
                </section>
                <section>
                    <h3>
                        <a href="https://www.dynata.com/">Dynata</a>
                        <span>Senior software engineer</span>
                    </h3>
                    <small>2020 - 2021</small>
                    <p>${translation.dynataSummary1}</p>
                    <p>${translation.dynataSummary2}</p>
                </section>
                <section>
                    <small>2017 - 2020 | Software engineer</small>
                    <p>${translation.dynataSummary3}</p>
                    <p>${translation.dynataSummary4}</p>
                </section>
                <section>
                    <small>2015 - 2017 | Junior software engineer</small>
                    <p>${translation.dynataSummary5}</p>
                    <p>${translation.dynataSummary6}</p>
                </section>
            </div>
            <div>
                <h2>${translation.studies}</h2>
                <section>
                    <h3>
                        <a href="https://inf.unideb.hu/">${translation.deik}</a>
                        <span>${translation.computerScience}</span>
                    </h3>
                    <small>2009 - 2014</small>
                    <p>
                        <a  href="https://dea.lib.unideb.hu/dea/handle/2437/192355">${translation.thesis}</a>
                        <span>- ${translation.thesisTitle}</span>
                    </p>
                </section>
                <section>
                    <h3>
                        <a href="http://www.nyirszikszi.hu/">Széchenyi István Közgazdasági, Informatikai Szakközépiskola és Kollégium</a>
                        <span>${translation.informaticsMajor}</span>
                    </h3>
                    <small>2004 - 2009</small>
                </section>
            </div>
            <div>
                <h2>${translation.hobbyProjects}</h2>
                <section>
                    <h3>
                        <a href="https://github.com/tkolok/mobx-pie">MobX Pie</a>
                    </h3>
                    <small>2017</small>
                    <p>${translation.mobxPieDescription}</p>
                </section>
            </div>
        </main>`;

    return [style, body];
}
