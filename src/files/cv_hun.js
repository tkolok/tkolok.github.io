export default (() => {
    const style = document.createElement('style');
    style.innerHTML = '@import "./src/files/style.css";';

    const body = document.createElement('div');
    body.className = 'flex flex-row flex-start';
    body.id = 'body';
    body.innerHTML = `
        <aside class="flex flex-column">
            <img alt="" src="./assets/images/cv.jpg">
            <div>
                <h2 id="programmingSkills">Programozási ismeretek</h2>
                <p>AngularJS, Angular, React, JavaScript, Typescript, CSS (Sass, Less), Java, MSSQL, Jira, TeamCity</p>
            </div>
            <div  class="flex-fill">
                <h2 id="languageSkills">Nyelvismeretek</h2>
                <ul>
                    <li>
                        <div class="language-skills flex flex-row flex-start">
                            <span id="english"
                                  class="flex-fill">
                                Angol
                            </span>
                            <div class="flex-fill">B2</div>
                        </div>
                    </li>
                </ul>
            </div>
            <div>
                <h2 id="contacts">Elérhetőségek</h2>
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
            <h1 id="name">Hadas Tamás</h1>
            <div>
                <h2 id="professionalExperience">Szakmai tapasztalat</h2>
                <section>
                    <h3>
                        <a href="https://blackbelt.hu/">BlackBelt</a>
                        <span>Front End Developer</span>
                    </h3>
                    <small>
                        <span>2021 -</span>
                        <span id="present">jelenleg</span>
                    </small>
                    <p id="blackBeltNI">
                        Az <a href="https://www.ni.com/">NI</a>-os projekt célja a céghez tartozó weboldalak performanciájának fejlesztése volt. Pár hónapon belül
                        ~30%-os javulást értünk el, majd fokozatosan javítottunk a teljesítményen. Ezen kívül egy tisztán JavaScript alapú design systemet hoztunk
                        létre, amely elsődleges célja az volt, hogy a cégen belül használt 4 frontend frameworknek legyen egy közös component libraryje. Ennek
                        dokumentáláshoz Storybookot használtunk.
                    </p>
                </section>
                <section>
                    <h3>
                        <a href="https://www.dynata.com/">Dynata</a>
                        <span>Senior software engineer</span>
                    </h3>
                    <small>2020 - 2021</small>
                    <p id="dynataSummary1">
                        A cég rendelkezik egy hatalmas adatbázissal, amelyhez tartozik egy sokrétű UI, amely AngularJS-re épül. A feladataim közé tartozott ennek
                        karbantartása, új komponensek hozzáadása, a felmerülő bugok kijavítása. Ezen egy 5-8 fős agilis módszertannal dolgozó csapat tagjaként dolgoztam
                        5 éven keresztül, ahol heti rendszerességgel jelentettem az amerikai stakeholdernek.
                    </p>
                    <p id="dynataSummary2">
                        Angularban készítettünk ehhez az adatbázishoz és UI-hoz egy admin felületet.
                    </p>
                </section>
                <section>
                    <small>2017 - 2020 | Software engineer</small>
                    <p id="dynataSummary3">
                        Miután cégünk összeolvadt egy másik céggel rengeteg különböző technológiát használó UI-unk volt. Ehhez NestJS-ben írtunk egy kiszolgáló
                        alkalmazást, melynek fő célja a különböző alkalmazások között való navigálás és authentikálás volt. Ennek architekturális tervezésében vettem
                        részt.
                    </p>
                    <p id="dynataSummary4">
                        Ekkoriban feladataim közé tartozott még a fő frontend alkalmazásunk egyszerűsített verziójának megírása React-ban.
                    </p>
                </section>
                <section>
                    <small>2015 - 2017 | Junior software engineer</small>
                    <p id="dynataSummary5">
                        Mielőtt AngularJS-re tértünk volna át a fő feladataim közé tartozott a JSF alapú (Primefaces) keretrendszert használó frontend és a hozzátartozó
                        adatbázis karbantartása, fejlesztése.
                    </p>
                    <p id="dynataSummary6">
                        Rendezvényeken rendszeres előadó voltam és mentorálással is foglalkoztam.
                    </p>
                </section>
            </div>
            <div>
                <h2 id="studies">Tanulmányok</h2>
                <section>
                    <h3>
                        <a id="deik"
                           href="https://inf.unideb.hu/">
                            Debreceni Egyetem Informatikai Kar
                        </a>
                        <span id="computerScience">Programtervező informatikus (BSc)</span>
                    </h3>
                    <small>2009 - 2014</small>
                    <p>
                        <a id="thesis"
                           href="https://dea.lib.unideb.hu/dea/handle/2437/192355">
                            Szakdolgozat
                        </a>
                        <span>- <span id="thesisTitle">Amőba játék szerver XMPP protokollal</span></span>
                    </p>
                </section>
                <section>
                    <h3>
                        <a href="http://www.nyirszikszi.hu/">Széchenyi István Közgazdasági, Informatikai Szakközépiskola és Kollégium</a>
                        <span id="informaticsMajor">Informatika szak</span>
                    </h3>
                    <small>2004 - 2009</small>
                </section>
            </div>
            <div>
                <h2 id="hobbyProjects">Hobbi projektek</h2>
                <section>
                    <h3>
                        <a href="https://github.com/tkolok/mobx-pie">MobX Pie</a>
                    </h3>
                    <small>2017</small>
                    <p id="mobxPieDescription">Egy példa repository, hogy (szerintem) hogyan érdemes a MobX 3.X verzióját React-tal használni.</p>
                </section>
            </div>
        </main>`;

    return [style, body];
})();