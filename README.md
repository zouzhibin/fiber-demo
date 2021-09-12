## 
1、workLoop
2、performUnitOfWork
3、beginWork，从父至子，进行组件（节点）更新；
4、completeUnitOfWork 从子至父，根据 effectTag，对节点进行一些处理
4、