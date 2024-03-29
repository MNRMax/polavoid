<script setup>
import { RouterLink, RouterView } from "vue-router";
import { supabase } from "./supabase";
import { useSessionStore } from "./stores/session";
import { ref, onMounted, onBeforeMount } from "vue";
import router from "./router";

const sessionStore = useSessionStore();

onBeforeMount(async () => {
    await getOldSession();
    if (window.location.pathname != "/confirmation") {
        redirect();
    }
});

async function redirect() {
    const { data, error } = await supabase
        .from("profiles")
        .select("updated_at")
        .eq("id", sessionStore.session.value.user.id);
    if (data[0].updated_at == null) {
        if (window) window.location.pathname = "/confirmation" ;
    }
}
async function getOldSession() {
    await supabase.auth.getSession().then(({ data }) => {
        sessionStore.session.value = data.session;
    });
    await supabase.auth.onAuthStateChange((_, _session) => {
        sessionStore.session.value = _session;
    });
}
</script>

<template>
    <div id="navigationBar">
        <a href="/"><img id="homeLogo" src="/favicon.ico" alt="" /></a>
        <a id="account" v-if="sessionStore.session.value" :href="`/profile/${sessionStore.session.value.user.id}`">
            <img class="logos" src="/acct-logo.png" alt="account logo image" />
        </a>
        <a id="create" v-if="sessionStore.session.value" href="/post"><img class="logos" src="/CreateLogo.png"
                alt="Light bulb logo image" />
        </a>
        <a id="people" v-if="sessionStore.session.value" href="/people"><img class="logos" id="pplLogo"
                src="/PeopleLogo.png" alt="account logo image" />
        </a>
        <div class="loginRegister" v-else>
            <a id="loginLink" href="/login">Log In</a>
            <a id="registerLink" href="/register">Register</a>
        </div>
        <a id="aboutLink" href="/about"><img class="logos" id="aboutLogo" src="/About-Logo.png"
                alt="Light bulb logo image" />
        </a>
    </div>
    <RouterView />
    <p id="note">Note: There is a bug where posts duplicate. Max will fix it.</p>
</template>

<style scoped>
#note {
    position: absolute;
    bottom: 0;
    left: 1rem;
    font-size: 0.75rem;
}
#navigationBar {
    z-index: 100;
    max-width: 1400px;
    max-width: none;
    width: max-content;
    height: 100px;
    text-align: center;
    color: var(--text);
    background-color: var(--background);
    border-radius: 10px;
    border: solid var(--box1) 3px;
    margin: 10px auto 30px;
    display: flex;
    flex-wrap: wrap;
    align-content: center;
}

.loginRegister {
    display: flex;
    flex-wrap: wrap;
    align-content: center;
}

#account,
#people,
#create,
#aboutLink,
#loginLink,
#registerLink {
    margin: 30px 90px;
    font-size: 20px;
}

.logos {
    width: 70px;
    margin: 0px;
}

h3 {
    margin: 0px;
}

#homeLogo {
    margin-right: 40px;
    margin-top: 40px;
    margin-left: 80px;
    width: 70px;
}

#createLogo {}
</style>
