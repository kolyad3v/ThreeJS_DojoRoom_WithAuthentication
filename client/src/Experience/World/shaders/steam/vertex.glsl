			uniform vec2 uFrequency;
			uniform float uTime;
			
			varying vec2 vUv;
			varying float yPosition;
			// varying float vElevation;

			void main()
			{
				
				vec4 modelPosition = modelMatrix * vec4(position, 1.0);

				// float elevation = sin(modelPosition.x * uFrequency.x - (uTime * 0.001)) *0.001;
				// elevation +=  sin(modelPosition.y * uFrequency.y  - (uTime * 0.001)) *0.01;

				// modelPosition.x += elevation;
				
				vec4 viewPosition = viewMatrix * modelPosition;
				vec4 projectedPosition = projectionMatrix * viewPosition;

				gl_Position = projectedPosition;

			
				vUv = uv;
				yPosition = modelPosition.y;
				// vElevation = elevation;
			} 