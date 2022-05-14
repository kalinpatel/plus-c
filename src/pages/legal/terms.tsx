import Header from "@/atoms/header";
import Layout from "@/templates/layout";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useEffectOnce } from "usehooks-ts";

const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: calc(100vw - 40px);
  padding: 0px 20px;
  margin: 0 auto;
  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    width: 50rem;
  }
  h4 {
    text-align: center;
    font-weight: 500;
    font-size: 1rem;
  }
  hr {
    width: 100%;
    border-color: ${({ theme }) => theme.colors.themed.minor};
    border-radius: 5px;
    margin-bottom: 18px;
  }
  color: ${({ theme }) => theme.colors.themed.minor};
  a {
    color: ${({ theme }) => theme.colors.brand.primaryAlteration};
  }
  &.bottom {
    margin-bottom: 60px;
  }
`;

interface TermsOfUseProps {
  privacy?: boolean;
}

export default function TermsOfUse({ privacy }: TermsOfUseProps) {
  useEffectOnce(() => {
    if (privacy) {
      document.querySelector("#privacy")?.scrollIntoView();
    }
  });
  return (
    <Layout title="Terms of Use">
      <Header title="Terms of Use" />
      <Page>
        <h2>Acceptance</h2>
        <p>
          Your continued usage of this website signifies your acceptance of the
          below terms of use and of the below{" "}
          <a href="#privacy">privacy policy</a>.
        </p>
        <hr />
        <h2>Allowed Usage</h2>
        <p>
          You may use this website for any purposes you wish, provided you do
          not violate any of the following conditions:
        </p>
        <ul>
          <li>
            Performing any illegal activity by using or in relation to this
            website.
          </li>
          <li>
            Using the tools on this website in a manner that violates any
            restrictions from a school you attend.
          </li>
          <li>
            Users who are under 13 years of age are not allowed to connect an
            account to this website.
          </li>
        </ul>
        <hr />
        <h2>Liability</h2>
        <p>
          This website holds no responsibility for the below situations, in
          which you agree to indemnify the website and its contributors of any
          liability.
        </p>
        <p>
          Even if a use case is not listed below, the agreement to indemnify the
          website and its contributors of any liability is still binding.
        </p>
        <h5>Some actions that we do not hold liability for:</h5>
        <ul>
          <li>
            Violating school or district rules or policies while using the
            website.
          </li>
          <li>Violating any laws or regulations while using the website.</li>
          <li>Obtaining incorrect answers from the website.</li>
          <li>
            Receiving a lower grade, or failing to receive a grade, from a
            school or district, due to your use of the website or any incorrect
            answers you receive from the website.
          </li>
        </ul>
        <hr />
        <h2>Copyright</h2>
        <p>
          Visual content, such as images, is deemed to be available in
          accordance with <Link to="/legal/license">the license</Link> unless:
          (1) the content bears the &quot;+C&quot;, &quot;+Calculus&quot;, or
          &quot;Plus C&quot; branding; (2) the content is a logo with
          representation of the Plus C branding; or (3) the content is noted to
          be from a third-party, and their terms apply. All source code is open
          source and may be freely used and shared, in accordance with{" "}
          <Link to="/legal/license">the license</Link>.
        </p>
        <hr />
        <h2>Third-Party Links</h2>
        <p>
          This website may contain links to third-party websites. These links
          are provided for your convenience only and may not be used to
          circumvent any of the terms of use of this website.
        </p>
        <p>
          If you feel that a link on this website is not appropriate for the
          context of this website, you may contact the webmaster of the website
          in question, at the email stated above.
        </p>
        <hr />
      </Page>
      <span id="privacy" />
      <Header title="Privacy Policy" />
      <Page className="bottom">
        <p>
          This privacy policy sets out how Plus C uses and protects any
          information that you give us when you use this website.
        </p>
        <p>
          We are committed to ensuring that your privacy is protected. Should we
          become aware of any unauthorized access to or alteration of your
          personal information, we will take reasonable steps to correct the
          problem.
        </p>
        <p>We do not sell, rent or lease our website to any third parties.</p>
        <p>
          This website contains links to other sites. Please be aware that we
          are not responsible for the content or privacy policies of these
          sites. We encourage our users to be aware when they leave our website
          and to read the privacy statements of any other site that collects
          personally identifiable information.
        </p>
        <p>
          This privacy policy applies only to our website. By using this
          website, you hereby consent to our privacy policy.
        </p>
        <hr />
        <p>
          Analytics data is collected on users of the site. For users within
          District 113, your organizational affiliation, such as role (staff or
          student), school building, or graduation year may be automatically
          collected if you login with school email account. For all other users,
          no identifiable information is associated with your analytics data.
        </p>
        <hr />
        <p>
          To delete your account and clear all data, go to User Settings &gt;
          Danger Zone &gt; Delete Account
        </p>
        <hr />
      </Page>
    </Layout>
  );
}
