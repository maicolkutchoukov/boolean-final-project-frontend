<script>
export default {
 /*  methods: {
    startAnimation(event) {
      const link = event.target;
      link.style.transform = 'translateX(100%)';
      setTimeout(() => {
        link.style.transform = 'translateX(0)';
      }, 500); 
    }
  } */
};
</script>

<template>
    <header>
      <nav class="navbar navbar-expand-lg navbar-dark my-navbar">
        <div class="container">
          <router-link :to="{ name: 'homme' }" class="navbar-brand">
            <img src="../../public/Img/LogoBMusic.png" alt="Logo" width="120">
          </router-link>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <router-link :to="{ name: 'instrumental' }" class="header-nav-link">Strumenti</router-link>
              </li>
              <li class="nav-item">
                <router-link :to="{ name: 'sponsor' }" class="header-nav-link">Sponsor</router-link>
              </li>
              <li class="nav-item">
                <a href="http://127.0.0.1:8000/login" class="header-nav-link">Accedi</a>
              </li>
              <li class="nav-item">
                <a href="http://127.0.0.1:8000/register" class="header-nav-link">Registrati</a>
              </li>
              <li class="nav-item">
                <router-link :to="{ name: 'search' }" class="header-nav-link">Cerca</router-link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  </template>
<style lang="scss" scoped>
header {
background-color: #21252B; color: #BADFDA; border: 1px solid #21252B;
width: 100%; min-height: 100px;
display: flex; align-items: center;
position: sticky; top: 0; left: 0; right: 0; z-index: 999;
.navbar-nav {
    display: flex; align-items: center; flex-direction: row; min-height: 100px;
    .navbar-nav li {
        list-style: none;
        &:active{
            animation: slideOutRight 0.5s ease-out;
        }
    }
}
.my-navbar {
    display: flex; align-items: center; justify-content: space-between; flex-grow: 1;
    .header-nav-link {
        background-color: #21252B; color: #BADFDA; border-radius: 25px;
        font-weight: bold; text-decoration: none; padding: 15px 25px; margin: 0 15px;
        position: relative; // Per consentire l'animazione di scorrere all'interno del link
        transition: transform 0.5s ease-out;
        &:hover {
            background-color: #BADFDA; color: #21252B; border-color: 1px solid #21252B;
            }
        }
        
        .navbar-toggler {
            border: 1px solid #BADFDA; background-color: #21252B; color: #BADFDA;
            &:focus {
                outline: none;
                }
            .navbar-toggler-icon{
                background-color: #21252B; color: #BADFDA;
                &hover{
                background-color: #BADFDA; border: 1px solid #21252B; color: #21252B;
                }
                &:focus {
                outline: none;
                }
            }

        } 
    }
}


@keyframes slideOutRight {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(100%);
  }
}


</style>