import { defineStore } from 'pinia';


export const useTodoStore = defineStore('todo', () => {
    
    const config = useRuntimeConfig()
    const todos = ref([])
    async function fetchTodo() {
      try {
        const response = await fetch('https://86a4h9y007.execute-api.eu-west-1.amazonaws.com/development/nulmeting/todo', {
          headers: {
            'x-api-key': config.public.API_KEY, 
          },
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch todo items');
        }

        const result = await response.json();

        const todoExists = todos.value.some(item => item.id === result.todo.id);
        if (!todoExists) {
          todos.value.push(result.todo);
        }
      } catch (error) {
        console.error('Error fetching todo:', error);
      }
    }

    return {
        todos,
        fetchTodo
    }
});