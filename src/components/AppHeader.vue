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
    <header class="">
      <nav class="navbar navbar-expand-lg navbar-dark my-navbar">
        <div class="container">
          <router-link :to="{ name: 'homme' }" class="navbar-brand">
            <img src="../../public/Img/LogoBMusic.png" alt="Logo" width="120">
          </router-link>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0 split-menu py-4 ">
              <li class="nav-item">
                <a href="http://127.0.0.1:8000/login" class="header-nav-link">Accedi</a>
              </li>
              <li class="nav-item">
                <a href="http://127.0.0.1:8000/register" class="header-nav-link">Registrati</a>
              </li>
              <li class="nav-item">
                <router-link :to="{ name: 'search' }" id="hover-link" class="header-nav-link">Cerca</router-link>
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
width: 100%;
position: sticky; top: 0; left: 0; right: 0; z-index: 999;
.navbar-nav {
    display: flex; align-items: center; flex-direction: row;
    padding: 20px 0;
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
        &:hover {
            color: white; border-color: 1px solid #21252B;
            }
        }
      #hover-link {
        background-color: #BADFDA;
        color: #21252B;
        &:hover {
            background-color: #21252B;
             color: #BADFDA;
             border: 1px solid #BADFDA;
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

.split-menu {
  display: flex;
  flex-direction: column;
}

@keyframes slideOutRight {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(100%);
  }
}

/* @media (max-width: 425px) {

  .split-menu {
    flex-direction: row;
    flex-wrap: wrap;
  }

  .split-menu .nav-item {
    width: 50%;
  }
  #hover-link { 
    background-color: transparent !important;
    color: #BADFDA !important;
  }

  ul {
    text-align: center;
  }
} */

@media (max-width: 768px) {
  .navbar-nav {
    justify-content: flex-end;
  }
}
</style>