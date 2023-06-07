<script setup>
import { ref } from "vue";
import convertToBase64 from "../base64";
import PostItem from "../components/postItem.vue";
import { useSessionStore } from "../stores/session";
import { supabase } from "../supabase";

const sessionStore = useSessionStore();

const caption = ref();
const description = ref();
const img = ref(null);
const tags = ref();

let post = () => {
  return {
    author: sessionStore.session.value.user.id,
    caption: caption.value,
    image: img.value,
  };
};

async function handleImage(event) {
  const data = await convertToBase64(event.target.files[0]);
  img.value = data;
}
async function handlePost() {
  try {
    const post = {
      author: sessionStore.session.value.user.id,
      caption: caption.value,
      description: description.value,
      tags: tags.value.split(" "),
      image: img.value,
      created_at: new Date(),
    };
    const { error } = await supabase.from("posts").insert(post);
    if (error) throw error;

    // Adding to used tag table -- post_id needs to be fixed for this to work
    /* let tagData = [];
    post.tags.forEach((tagTxt) => {
      tagData.push({
        post_id: post.id,
        user_id: sessionStore.session.value.user.id,
        created_at: new Date(),
        tag_txt: tagTxt,
      });
    });
    const { dataOne, errorOne } = await supabase
      .from("tags_used")
      .upsert(tagData)
      .select(); */

    window.location = `/profile/${sessionStore.session.value.user.id}`;
  } catch (error) {
    console.log(error);
  }
}
</script>

<template>
  <form @submit.prevent="handlePost">
    <div id="leftSide">
      <h2>Preview</h2>
      <PostItem :post="post()" />
    </div>

    <div id="rightSide">
      <div id="imgArea">
        <label for="imgInput">
          Click to pick image!
          <input
            id="imgInput"
            type="file"
            accept="image/*"
            ref="image"
            @change="handleImage"
            required
        /></label>
      </div>
      <textarea
        id="titleText"
        placeholder="Caption"
        v-model="caption"
        maxlength="50"
        pattern="[a-zA-Z0-9]+"
        rows="1"
        required
      ></textarea>
      <textarea
        id="postText"
        placeholder="What's happening?"
        v-model="description"
        rows="3"
        required
      ></textarea>
      <textarea
        id="tagsText"
        placeholder="Tags (Space Sepereated)"
        v-model="tags"
        rows="1"
        required
      ></textarea>
    </div>
    <button id="postButton">Post</button>
  </form>
</template>

<style scoped>
#imgInput {
  display: none;
}
label {
  cursor: pointer;
}
#postPreview {
  left: 0px;
  width: 890px;
}
#imgArea {
  font-size: 30px;
}
textarea,
#imgArea {
  margin: 10px;
  resize: none;
  background-color: var(--background);
  border: 2px var(--text) solid;
  border-radius: 10px;
  color: var(--text);
  padding: 1rem;
  max-width: 60%;
}
#postText {
  font-size: 2rem;
  height: 10rem;
  width: 90%;
}
#postButton {
  font-size: 3rem;
  height: 4rem;
  width: fit-content;
  position: absolute;
  bottom: 2rem;
  border: 3px solid var(--accent);
  left: 50%;
  transform: translateX(-50%);
  background-color: var(--button);
  border-radius: 20px;
  margin: 50px;
}
#postButton:hover {
  cursor: pointer;
}
#titleText {
  font-size: 1.7rem;
  width: 90%;
}
#tagsText {
  font-size: 1.7rem;
  width: 90%;
}
#rightSide {
  position: absolute;
  width: 50%;
  left: 50%;
}
#leftSide {
  top: 60px;
  width: 100%;
  margin-top: 40px;
  margin-left: 15%;
}
</style>
