import { Fragment, useState } from 'react';
import SlideBackground from './backgrounds/SlideBackground';
import questionImage from '../images/question.svg';

const ContactForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  return (
    <Fragment>
      <div className="container mx-auto px-5 md:px-10 min-h-screen">
        <h1 className="mt-5 mb-2 ml-5 text-3xl font-bold text-yellow-500">
          Contact Form
        </h1>
        <section className="mb-10">
          <h2 className="text-xl pt-3 mb-3 font-bold">お問合わせ</h2>
          <div className="rounded-lg shadow-xl bg-white p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-5">
              <img src={questionImage} alt="質問" />
              <form className="w-full max-w-lg">
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      苗字
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                      type="text"
                      placeholder="山田"
                    />
                    <p className="text-red-500 text-xs italic">
                      苗字を入力してください。
                    </p>
                  </div>
                  <div className="w-full md:w-1/2 px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      名前
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      type="text"
                      placeholder="太郎"
                    />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      メールアドレス
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      type="email"
                      placeholder="example@yahoo.co.jp"
                    />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      お問い合わせ内容
                    </label>
                    <textarea
                      className=" no-resize appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-48 resize-none"
                    ></textarea>
                  </div>
                </div>
                <div className="md:flex md:items-center">
                  <div className="md:w-1/3">
                    <button
                      className="shadow bg-yellow-500 hover:bg-yellow-300 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                      type="button"
                    >
                      送信
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
      <SlideBackground />
    </Fragment>
  );
};

export default ContactForm;
