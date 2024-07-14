import * as React from "react";
import { useState } from "react";

//Mui Components
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Grid } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";

//Manual Components
import TitleComponent from "../../components/ProfileComponents/TitleComponents/TitleComponent.jsx";
import { BreadCrumbsTypeTwo } from "../../components/ProfileComponents/BreadCrumbsComp/BreadCrumbsAll.jsx";
import {
  successMessage,
  errorMessage,
  defaultMessage,
  infoMessage,
  warningMessage,
} from "../../components/Toast/ToastCustom";
import { ToastContainerCustom } from "../../components/Toast/ToastCustom";
import Footer from "../../components/FooterComp/Footer.jsx";
import Header from "../../components/ProfileComponents/Header/Header.jsx";

import "./HelpPageStyle.css";
import { useParams } from "react-router-dom";

function HelpPage({ navItems }) {
  const [isOpen, setIsOpen] = useState(false);
  const [tabNumber, setTabNumber] = useState(0);

  const number = useParams();

  function handdleChange() {
    setIsOpen((elm) => !elm);
  }
  return (
    <React.Fragment>
      <CssBaseline />
      <Grid
        sx={{
          display: "flex",
        }}
      >
        <ToastContainerCustom />
        <Grid
          item
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "column",
            minHeight: "100vh",
            width: "100%",
          }}
          xs={12}
        >
          <Header
            isOpen={isOpen}
            activeTab={tabNumber}
            setTab={setTabNumber}
            navItems={navItems}
          />
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              flexDirection: "column",
              paddingTop: { xs: "10px", sm: "15px", md: "18px", lg: "20px" },
              paddingBottom: { xs: "10px", sm: "15px", md: "18px", lg: "20px" },
            }}
            className="container-custome"
          >
            {" "}
            <Grid
              item
              container
              xs={12}
              sm={10}
              md={8}
              lg={7}
              xl={6}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                width: "100%",
              }}
              className="contentCardParent"
            >
              <BreadCrumbsTypeTwo breadCrumbsItems={breadCrumbsItems} />
              <Divider
                color="#d8c3a5"
                style={{ width: "100%", height: "2px" }}
              />
              <TitleComponent
                title={"راهنمای بیدوین"}
                iconNumber={2}
                titleClassName={"titleClass"}
                iconClassName={"iconClassNameTitle"}
              />
              <Divider
                color="#d8c3a5"
                style={{ width: "100%", height: "2px" }}
              />
              <Grid
                item
                xs={12}
                container
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: { xs: "column", md: "column" },
                  width: "100%",
                  padding: "20px 20px",
                }}
              >
                <Grid
                  item
                  container
                  xs={12}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  {accorData.map((element, index) => (
                    <AccordionComponent
                      defaultEx={number.number == index + 1 ? true : false}
                      accParentClass="accorParent"
                      iconClassName="iconClassName"
                      titleClassName="titleAccordian"
                      detailClassName="detailClassName"
                      paragraphClassName="pClassName"
                      questionClassName="questionClassName"
                      answerClass="answerClassName"
                      title={element.title}
                      content={element.content}
                      index={index}
                      isMultiple={element.isMultiple}
                      isQuestion={element.isQuestion}
                    />
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Footer />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default HelpPage;
function AccordionComponent({
  accParentClass,
  iconClassName,
  titleClassName,
  detailClassName,
  paragraphClassName,
  questionClassName,
  answerClass,
  title = "",
  content = "",
  isMultiple = false,
  isQuestion = false,
  defaultEx,
}) {
  return (
    <Accordion className={accParentClass} defaultExpanded={defaultEx}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon className={iconClassName} />}
        aria-controls="panel1-content"
        className={titleClassName}
      >
        {title}
      </AccordionSummary>
      <AccordionDetails className={detailClassName}>
        {isQuestion ? (
          content.map((item, index) => (
            <>
              <p className={questionClassName}>{`سوال ${index + 1}) ${
                item.question
              }`}</p>
              {item.ismultipleAnswer ? (
                item.answer.map((element, index) => (
                  <p className={answerClass}>{`${index + 1}) ${
                    element.subAnswer
                  }`}</p>
                ))
              ) : (
                <p className={answerClass}>{`پاسخ)${item.answer}`}</p>
              )}
            </>
          ))
        ) : isMultiple ? (
          content.map((item, index) => (
            <p className={paragraphClassName}>{`${index + 1}) ${
              item.subContent
            } `}</p>
          ))
        ) : (
          <p className={paragraphClassName}>{content}</p>
        )}
      </AccordionDetails>
    </Accordion>
  );
}
const accorData = [
  {
    index: 0,
    isMultiple: false,
    isQuestion: false,
    title: "راهنمای خرید",
    content:
      " شما می‌توانید با مراجعه به صفحات مختلف سایت و پیدا کردن محصول موردنظر خود روی محصول کلیک کرده و وارد صفحه مختص به آن محصول بشوید سپس می‌توانید با پرداخت قیمت رزرو آن محصول را به‌صورت مستقیم خریداری کنید یا اینکه با افزایش قیمت پیشنهادی منتظر تمام شدن زمان بمانید و درصورتی که رقم پیشنهادی شما بالاترین رقم پیشنهادی موجود باشد آنگاه شما برنده آن محصول خواهید بود.",
  },
  {
    index: 1,
    isMultiple: false,
    isQuestion: false,
    title: "نحوه ثبت سفارش",
    content:
      "برای ثبت سفارش تنها کافی است هنگامی که زمان مزایده یک محصول به پایان می‌رسد شما بالاترین قیمت را پیشنهاد داده باشید یا اینکه خرید محصول با قیمت رزرو را انتخاب کرده باشید آنگاه محصول در سبد خرید شما قرار می‌گیرد و پس از پرداخت وجه توسط شما سفارش شما ثبت می‌شود و برای شما ارسال می‌شود.",
  },
  {
    index: 2,
    isMultiple: false,
    isQuestion: false,
    title: "نحوه ارسال مرسوله",
    content:
      "بسته به اینکه شما از کدام فروشنده محصول خود را تهیه می‌کنید، نحوه ارسال مرسوله ممکن است متفاوت باشد! اما این تضمین به شما داده می‌شود که محصول به‌صورت سالم و دقیقا مطابق آنچه که به شما معرفی شده‌است به آدرسی که شما مشخص کرده‌اید ارسال شود و اگر این اتفاق نیافتد شما می‌توانید محصول را برگردانده و مبلغ پرداخت‌شده را پس بگیرید.",
  },
  {
    index: 3,
    isMultiple: true,
    isQuestion: false,
    title: "قوانین و مقررات",
    content: [
      {
        itemNumber: 1,
        subContent:
          " کاربران تنها در صورتی می‌توانند برای یک محصول مبلغی را پیشنهاد دهند که حداقل یک پنجم آن مبلغ، در کیف پول آنها موجود باشد و در صورتی که کاربری برنده محصولی در مزایده شود اما تمام مبلغ را پرداخت نکند آنگاه یک پنجم مبلغ پیشنهاد داده‌شده که در کیف پول کاربر موجود بوده است به‌عنوان خسارت کسر می‌شود و محصول به خریدار تحویل داده نمی‌شود.",
      },
      {
        itemNumber: 2,
        subContent:
          " درصورتی که کاربری یک محصول را در مزایده برنده شود و  مبلغ را پرداخت کند اما فروشنده محصول را به کاربر تحویل  ندهد آنگاه این مورد در سابقه فروشنده ثبت می‌شود و مبلغ به  خریدار برگردانده می شود.",
      },
      {
        itemNumber: 3,
        subContent:
          " درصورتی که فروشنده‌ای بیش از 3 بار محصول را به خریدار  تحویل ندهد حساب کاربری‌اش مسدود شده و دیگر امکان فروش  محصول در سایت بیدوین را ندارد!",
      },
    ],
  },
  {
    index: 4,
    isMultiple: false,
    isQuestion: false,
    title: "نحوه ارتباط با ما",
    content:
      "شما می‌توانید در پایین صفحه سایت در قسمت انتقادات و  پیشنهادات نظر خود را برای ما ارسال کنید ما حتما نظرات شما را بررسی خواهیم کرد و در صورت مفید بودن، آن‌ها را اعمال  خواهیم کرد.",
  },
  {
    index: 5,
    isMultiple: true,
    isQuestion: false,
    title: "درباره‌ی ما",
    content: [
      {
        itemNumber: 1,
        subContent:
          "بیدوین یک سایت برای خرید و فروش محصولات به‌صورت مزایده‌ای است  که در آن کاربران می‌توانند محصولات خود رابه فروش بگذارند و کاربران دیگری که به این محصولات نیاز دارند با ارائه قیمت پیشنهادی خود برای خرید آن محصول، با یکدیگر رقابت کنند و با  یک قیمت معقول آن کالا را بدست بیاورند.",
      },
      {
        itemNumber: 2,
        subContent:
          "  البته در کنار اینکه تلاش می‌کنیم خریداران از خرید خود سود کنند به دنبال این هم هستیم که فروشندگان هم ضرر نکنند بنابراین این امکان برای فروشندگان وجود دارد که حداقل قیمت فروش را تعیین کنند تا محصول با قیمت کمتر از آن به فروش  نرسد.",
      },
    ],
  },
  {
    index: 6,
    isMultiple: true,
    isQuestion: true,
    title: "سوالات متداول",
    content: [
      {
        questionNumber: 1,
        question: "مزایده چیست؟",
        answer:
          " در این روش فروشنده با انتخاب قیمت پایه و مدت زمان، کالا را به صورت مزایده ثبت می‌کند. خریداران در طول زمان برگزاری مزایده پیشنهاد قیمتی خود را برروی کالا ثبت می‌کنند. وقتی زمان مزایده به پایان برسد، کسی که بیشترین پیشنهاد را داده، برنده مزایده می‌شود. برنده باید وجه کالا را پرداخت کند و فروشنده نیز باید کالا را ارسال کند.",
        ismultipleAnswer: false,
      },
      {
        questionNumber: 2,
        question: "برنده چقدر زمان دارد تا مبلغ را پرداخت کند؟",
        answer:
          " کاربری که بالاترین پیشنهاد را ثبت کرده باشد برنده مزایده است و بلافاصله بعد از پایان مزایده در اعلانات و با پیامک به برنده اطلاع رسانی می‌شود. برنده از لحظه پایان مزایده تا حداکثر ۲۴ ساعت فرصت دارد تا مبلغ را پرداخت کند در غیر اینصورت به اندازه یک پنجم مبلغ پیشنهادی‌اش جریمه می‌شود!",
        ismultipleAnswer: false,
      },
      {
        questionNumber: 3,
        question: "سرویس قیمت رزرو چیست؟",
        answer: [
          {
            subAnswer:
              'فروشنده با خرید سرویس "رزرو قیمت"، اجازه دارد اگر در مزایده کالا به قیمت دلخواهش نرسید، کالا را ارسال نکند و جریمه نشود.',
          },
          {
            subAnswer:
              "  فروشنده در هنگام ثبت کالا به صورت مزایده می‌تواند از این  سرویس استفاده کند و قیمت دلخواهش را به عنوان رزرو ثبت کند و فقط بیدوین و فروشنده از آن با خبر هستند.",
          },
          {
            subAnswer:
              " قیمت رزرو به خریداران نمایش داده نمی‌شود تنها به آنها اطلاع داده می‌شود که قیمت به رزرو رسیده یا نرسیده است.",
          },

          {
            subAnswer:
              "اگر پیشنهادات به قیمت رزرو و بالاتر رسید، برنده باید مبلغ کالا را پرداخت کند و فروشنده نیز باید کالا را ارسال کند. در غیر اینصورت جریمه خواهند شد!.",
          },
        ],
        ismultipleAnswer: true,
      },
    ],
  },
  {
    index: 7,
    isMultiple: false,
    isQuestion: false,
    title: "خدمات مشتریان",
    content:
      "  تیم پشتیبانی ما در 24 ساعت روز و 7 روز هفته آماده است تا مشکلات شما را حل نماید بنابراین اگر در خرید و فروش محصولات به مشکل خوردید می‌توانید با ما ارتباط بگیرید.",
  },
];
const breadCrumbsItems = [
  {
    key: 1,
    title: "بیدوین",
    className: "breadCrumbsNavlink",
    toLink: "/",
    isTheLastItem: false,
  },
  {
    key: 2,
    title: "راهنمای بیدوین",
    className: "breadCrumbsNavlink",
    toLink: "",
    isTheLastItem: true,
  },
];
