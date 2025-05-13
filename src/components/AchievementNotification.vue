<template>
    <transition-group name="notification" tag="div" class="notification-container">
      <div
        v-for="(item, index) in notifications"
        :key="item.id + '-' + index"
        class="notification"
      >
        <div class="icon">🏆</div>
        <div class="text-content">
          <strong>{{ item.name }}</strong>
          <p>{{ item.description }}</p>
        </div>
      </div>
    </transition-group>
  </template>
  
  <script>
  export default {
    data() {
      return {
        notifications: []
      }
    },
    methods: {
      addNotification(achievement) {
        this.notifications.push(achievement)
  
        setTimeout(() => {
          this.notifications.shift()
        }, 6000)
      }
    }
  }
  </script>
  
  <style scoped>
  .notification-container {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  
  .notification {
    display: flex;
    background: #fff;
    border-left: 5px solid #4caf50;
    padding: 12px 16px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    animation: fade-in 0.4s ease-out;
    max-width: 300px;
  }
  
  .icon {
    font-size: 24px;
    margin-right: 12px;
  }
  
  .text-content {
    flex: 1;
  }
  
  .notification-enter-active,
  .notification-leave-active {
    transition: all 0.5s ease;
  }
  
  .notification-enter-from,
  .notification-leave-to {
    opacity: 0;
    transform: translateX(100%);
  }
  </style>
  