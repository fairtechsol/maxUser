// src/pqina__flip.d.ts

declare module '@pqina/flip' {
    interface Tick {
      value: number | string;
      // Define other properties and methods if necessary
    }
  
    namespace Tick {
      namespace DOM {
        function create(element: HTMLElement, options: { 
          value: number | string; 
          didInit: (tick: Tick) => void; 
          repeat: boolean; 
          view: {
            children: Array<{
              root: string;
              style: string;
              repeat: boolean;
              children: Array<{
                view: string;
              }>;
            }>;
          };
        }): void;
        function destroy(tick: Tick): void;
      }
    }
  
    export = Tick;
  }
  