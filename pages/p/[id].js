import Layout from "../../components/Layout";
import fetch from "isomorphic-unfetch";

const Post = (props) => {
  debugger;
  console.log(props);
  if (props.show.status !== 'Ended') {
    return <Layout><h1>{props.show.message || "Oops !"}</h1></Layout>;
  }
  return (
    <Layout>
      <h1>{props.show?.name}</h1>
      <p>{props.show?.summary.replace(/<[/]?[pb]>/g, "")}</p>
      {props.show?.image ? <img src={props.show.image.medium} /> : null}
    </Layout>
  );
};

Post.getInitialProps = async function (context) {
  debugger;
  // this method will be executed in the client if the user navigated from the link
  // this mehtod will be executed in the server if the user directly hit this link or refresh the  page
  const { id } = context.query;
  const res = await fetch(`https://api.tvmaze.com/shows/${id}`);
  const show = await res.json();

  console.log(`Fetched show: ${show.name}`);

  return { show };
};

export default Post;
